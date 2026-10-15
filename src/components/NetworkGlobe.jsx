import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Coordinates defining the outline of the world continents for detailed dot mapping.
const CONTINENTS = [
  // North America & Greenland
  {
    points: [
      [-168, 65], [-150, 70], [-120, 75], [-90, 70], [-70, 75], [-60, 83], [-10, 83],
      [-20, 70], [-45, 60], [-55, 50], [-70, 48], [-75, 35], [-80, 25], [-95, 15],
      [-105, 20], [-115, 30], [-120, 40], [-125, 48], [-140, 50], [-145, 60], [-160, 58]
    ]
  },
  // South America
  {
    points: [
      [-80, 12], [-72, 10], [-60, 5], [-50, -5], [-35, -5], [-40, -20], [-60, -40],
      [-70, -55], [-75, -55], [-72, -40], [-80, -20], [-82, -5]
    ]
  },
  // Africa
  {
    points: [
      [-17, 32], [-5, 36], [10, 37], [20, 31], [32, 31], [34, 27], [43, 27],
      [51, 12], [46, 5], [40, -15], [38, -25], [34, -34], [18, -34], [10, -10],
      [8, 5], [-10, 5], [-15, 15], [-17, 20]
    ]
  },
  // Eurasia (Europe + Asia)
  {
    points: [
      [-10, 63], [10, 58], [25, 71], [35, 68], [40, 70], [60, 70], [80, 75],
      [100, 77], [120, 77], [140, 75], [160, 75], [175, 70], [170, 60], [160, 50],
      [145, 45], [130, 35], [120, 20], [115, 15], [108, 5], [105, 10], [100, 15],
      [90, 10], [80, 8], [75, 10], [72, 20], [68, 25], [60, 25], [50, 15], [45, 15],
      [35, 30], [25, 35], [15, 30], [5, 35], [-5, 35], [-9, 43], [-5, 50], [-10, 55]
    ]
  },
  // Australia
  {
    points: [
      [113, -22], [115, -15], [125, -15], [135, -10], [145, -12], [153, -28],
      [150, -35], [140, -37], [117, -35]
    ]
  },
  // Japan
  {
    points: [
      [130, 32], [135, 35], [140, 38], [142, 43], [140, 45], [135, 40], [130, 35]
    ]
  },
  // Madagascar
  {
    points: [
      [48, -12], [50, -15], [50, -22], [47, -25], [45, -20], [45, -15]
    ]
  },
  // New Zealand
  {
    points: [
      [166, -45], [175, -39], [178, -42], [172, -47]
    ]
  },
  // Great Britain & Ireland
  {
    points: [
      [-10, 50], [-5, 55], [-2, 58], [-5, 60], [-8, 55]
    ]
  }
];

// Flight paths with starting/ending coordinates, color, visual height, and speed.
const FLIGHT_PATHS = [
  // USA -> Europe - Cyan
  { from: [39, -98], to: [50, 10], color: "#22d3ee", height: 0.22, speed: 0.8 },
  // India -> USA - Orange-Yellow
  { from: [20, 77], to: [39, -98], color: "#f97316", height: 0.32, speed: 0.6 },
  // Europe -> South America - Pink/Red
  { from: [50, 10], to: [-20, -50], color: "#ec4899", height: 0.28, speed: 0.7 },
  // Japan -> Australia - Purple
  { from: [35, 139], to: [-25, 133], color: "#a855f7", height: 0.25, speed: 0.9 },
  // India -> Singapore - Green
  { from: [20, 77], to: [1.35, 103.8], color: "#10b981", height: 0.18, speed: 1.1 }
];

// Draw continent polygons to a canvas and sample points on a sphere that intersect land.
function generateGlobePoints(radius) {
  const w = 1024;
  const h = 512;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  const toX = (lon) => ((lon + 180) / 360) * w;
  const toY = (lat) => ((90 - lat) / 180) * h;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#ffffff";
  CONTINENTS.forEach(cont => {
    ctx.beginPath();
    cont.points.forEach((pt, idx) => {
      const x = toX(pt[0]);
      const y = toY(pt[1]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  });

  const imgData = ctx.getImageData(0, 0, w, h).data;
  const positions = [];

  const latSegments = 140; // Finer density for crisp look
  const lonSegments = 280;

  for (let i = 0; i < latSegments; i++) {
    const lat = -90 + (i / latSegments) * 180;
    const phi = ((90 - lat) * Math.PI) / 180;
    const cosLat = Math.cos((lat * Math.PI) / 180);
    // Scale longitude points at each latitude to preserve uniform spacing
    const numLon = Math.max(4, Math.round(lonSegments * cosLat));

    for (let j = 0; j < numLon; j++) {
      const lon = -180 + (j / numLon) * 360;
      const theta = (lon * Math.PI) / 180;

      const x = Math.floor(((lon + 180) / 360) * w);
      const y = Math.floor(((90 - lat) / 180) * h);
      const pixelIndex = (y * w + x) * 4;
      const isLand = imgData[pixelIndex] > 128;

      if (isLand) {
        const posX = radius * Math.sin(phi) * Math.cos(theta);
        const posY = radius * Math.cos(phi);
        const posZ = radius * Math.sin(phi) * Math.sin(theta);
        positions.push(posX, posY, posZ);
      }
    }
  }

  return new Float32Array(positions);
}

// Generate a premium glowing circular particle texture
function createDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.2, "rgba(34, 211, 238, 0.95)");
  grad.addColorStop(0.5, "rgba(14, 116, 144, 0.35)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);

  return new THREE.CanvasTexture(canvas);
}

// Convert spherical coordinates to 3D point
function latLonToVec3(lat, lon, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Create a quadratic bezier curve representing a flight connection path
function createArcCurve(fromLat, fromLon, toLat, toLon, radius, height) {
  const start = latLonToVec3(fromLat, fromLon, radius);
  const end = latLonToVec3(toLat, toLon, radius);

  // Calculate midpoint raised above the surface
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(radius + height * radius);

  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

// Renders the glowing dotted particles representing the continents
function DottedGlobe({ radius, isMobile }) {
  const positions = useMemo(() => generateGlobePoints(radius), [radius]);
  const texture = useMemo(() => createDotTexture(), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.042 : 0.05}
        map={texture}
        transparent
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#22d3ee"
      />
    </points>
  );
}

// A solid backing sphere designed to match the hero background.
// This prevents particles on the back of the globe from overlapping with the frontside.
function BackingSphere({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 0.985, 32, 32]} />
      <meshBasicMaterial color="#030c1d" toneMapped={false} />
    </mesh>
  );
}

// A subtle glowing wireframe grid wrapping the globe.
function AtmosphereGlow({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.025, 24, 24]} />
      <meshBasicMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.07}
      />
    </mesh>
  );
}

// Renders the multi-colored connection lines
function ArcLines({ radius }) {
  const curvesData = useMemo(() => {
    return FLIGHT_PATHS.map(path => {
      const curve = createArcCurve(path.from[0], path.from[1], path.to[0], path.to[1], radius, path.height);
      const points = curve.getPoints(50);
      return {
        points: points.map(p => [p.x, p.y, p.z]),
        color: path.color
      };
    });
  }, [radius]);

  return (
    <group>
      {curvesData.map((c, i) => (
        <Line
          key={i}
          points={c.points}
          color={c.color}
          lineWidth={1.2}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

// Renders tracer pulses flying along the curves with decaying tail sizes and opacities
function ArcPulses({ radius }) {
  const groupRef = useRef();

  const curves = useMemo(() => {
    return FLIGHT_PATHS.map(path => {
      return {
        curve: createArcCurve(path.from[0], path.from[1], path.to[0], path.to[1], radius, path.height),
        color: path.color,
        speed: path.speed
      };
    });
  }, [radius]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((pathGroup, pathIdx) => {
      const pathInfo = curves[pathIdx];
      if (!pathInfo) return;

      // Speed factor determines travel frequency along the arc
      const t = (state.clock.elapsedTime * 0.14 * pathInfo.speed) % 1;

      const offsets = [0, 0.02, 0.04];
      pathGroup.children.forEach((mesh, index) => {
        const offset = offsets[index];
        const currentT = Math.max(0, t - offset);
        const pos = pathInfo.curve.getPoint(currentT);
        mesh.position.copy(pos);
      });
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map((path, pathIdx) => (
        <group key={pathIdx}>
          {/* Leader tracer */}
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={path.color} transparent opacity={1} />
          </mesh>
          {/* Middle trailer */}
          <mesh>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={path.color} transparent opacity={0.65} />
          </mesh>
          {/* Back trailer */}
          <mesh>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color={path.color} transparent opacity={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Space stars floating slowly in the background
function SpaceStars({ isMobile }) {
  const count = isMobile ? 120 : 250;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    return pos;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.015 : 0.018}
        color="#e2f8ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlobeGroup({ isMobile }) {
  const groupRef = useRef();
  const radius = isMobile ? 1.05 : 1.35;

  useFrame((state) => {
    if (groupRef.current && isMobile) {
      // Manual rotation on mobile since we disable OrbitControls
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <BackingSphere radius={radius} />
      <DottedGlobe radius={radius} isMobile={isMobile} />
      <AtmosphereGlow radius={radius} />
      <ArcLines radius={radius} />
      <ArcPulses radius={radius} />
    </group>
  );
}

export default function NetworkGlobe({ isMobile = false }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      {/* Glow bloom behind the globe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(34,211,238,0.11), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
        style={{
          filter: isMobile
            ? "drop-shadow(0 0 15px rgba(34,211,238,0.18))"
            : "drop-shadow(0 0 25px rgba(34,211,238,0.25))",
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#22d3ee" intensity={1.5} />

        <SpaceStars isMobile={isMobile} />
        <GlobeGroup isMobile={isMobile} />

        {!isMobile && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.8}
            minDistance={3.2}
            maxDistance={5.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI * 2 / 3}
          />
        )}
      </Canvas>
    </div>
  );
}
