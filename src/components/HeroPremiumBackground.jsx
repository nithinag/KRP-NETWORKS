/**
 * HeroPremiumBackground — Premium telecom-style hero background.
 * Combines: fiber optic streaks, 3D globe with arcs, tsparticles.
 */

import { useEffect, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Arc data for globe — major fiber/internet routes
const ARCS_DATA = [
  { startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 },
  { startLat: 51.5, startLng: -0.1, endLat: 25.2, endLng: 55.3 },
  { startLat: 25.2, startLng: 55.3, endLat: 19.1, endLng: 72.9 },
  { startLat: 19.1, startLng: 72.9, endLat: 1.35, endLng: 103.8 },
  { startLat: 1.35, startLng: 103.8, endLat: 35.7, endLng: 139.7 },
  { startLat: 35.7, startLng: 139.7, endLat: -33.9, endLng: 151.2 },
  { startLat: 37.8, startLng: -122.4, endLat: 35.7, endLng: 139.7 },
  { startLat: 48.9, startLng: 2.35, endLat: 35.7, endLng: 139.7 },
  { startLat: 13.1, startLng: 80.3, endLat: 1.35, endLng: 103.8 },
];

const FIBER_STREAKS = [
  { id: 1, angle: -15, delay: 0, duration: 12 },
  { id: 2, angle: 5, delay: 2, duration: 14 },
  { id: 3, angle: -25, delay: 4, duration: 10 },
  { id: 4, angle: 15, delay: 1, duration: 16 },
  { id: 5, angle: -5, delay: 3, duration: 13 },
];

function FiberStreaks({ isMobile }) {
  const count = isMobile ? 3 : 5;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {FIBER_STREAKS.slice(0, count).map((s) => (
        <div
          key={s.id}
          className="hero-fiber-streak absolute left-0 right-0 top-1/2 w-full h-px origin-center"
          style={{
            "--streak-angle": `${s.angle}deg`,
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), rgba(56,189,248,0.25), rgba(34,211,238,0.15), transparent)",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function GlobeLayer({ isMobile }) {
  const arcs = useMemo(() => (isMobile ? ARCS_DATA.slice(0, 4) : ARCS_DATA), [isMobile]);
  const globeSize = isMobile ? 280 : 420;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <Globe
        width={globeSize}
        height={globeSize}
        backgroundColor="transparent"
        showGlobe={false}
        showAtmosphere={true}
        atmosphereColor="#22d3ee"
        atmosphereAltitude={0.15}
        arcsData={arcs}
        arcColor={() => ["#22d3ee", "#38bdf8"]}
        arcAltitude={0.25}
        arcStroke={0.3}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcCurveResolution={isMobile ? 32 : 64}
      />
    </div>
  );
}

function HeroParticlesLayer({ isMobile }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: isMobile ? 30 : 60,
      particles: {
        number: { value: isMobile ? 30 : 60 },
        color: { value: "#22d3ee" },
        opacity: { value: 0.4 },
        size: { value: { min: 0.5, max: 1.5 } },
        move: {
          enable: true,
          speed: isMobile ? 0.5 : 1,
          direction: "none",
          random: true,
          straight: false,
        },
        links: {
          enable: true,
          distance: 120,
          color: "#22d3ee",
          opacity: 0.2,
          width: 0.5,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onHover: { enable: false }, onClick: { enable: false } },
      },
    }),
    [isMobile]
  );

  if (!init) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Particles id="hero-particles" options={options} />
    </div>
  );
}

export default function HeroPremiumBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const fn = () => setIsMobile(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-slate-950" />
      <FiberStreaks isMobile={isMobile} />
      <GlobeLayer isMobile={isMobile} />
      <HeroParticlesLayer isMobile={isMobile} />
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/92 via-slate-950/85 to-slate-950/95 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
