import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener("change", fn);
    fn();
    return () => mq.removeEventListener("change", fn);
  }, []);
  return isMobile;
}
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi2";
import { getWhatsAppUrl } from "../../services/whatsappService";
import NetworkGlobe from "../NetworkGlobe";

const RIPPLE_COOLDOWN_MS = 600;
const RIPPLE_MIN_DURATION_MS = 800;
const RIPPLE_MAX_DURATION_MS = 1200;
const STAR_REACT_X_MAX = 8;
const STAR_REACT_Y_MAX = 6;

const SPACE_STARS = Object.freeze([
  { id: "star-1", top: "7%", left: "8%", size: 1.2, opacity: 0.38, delay: 0.2, duration: 4.6 },
  { id: "star-2", top: "10%", left: "22%", size: 1.8, opacity: 0.31, delay: 1.2, duration: 5.8 },
  { id: "star-3", top: "8%", left: "36%", size: 1.4, opacity: 0.42, delay: 0.8, duration: 6.2 },
  { id: "star-4", top: "14%", left: "52%", size: 1.1, opacity: 0.34, delay: 2.1, duration: 4.8 },
  { id: "star-5", top: "9%", left: "68%", size: 1.7, opacity: 0.28, delay: 1.6, duration: 6.4 },
  { id: "star-6", top: "13%", left: "84%", size: 1.5, opacity: 0.37, delay: 2.9, duration: 5.3 },
  { id: "star-7", top: "22%", left: "12%", size: 1.3, opacity: 0.3, delay: 1.7, duration: 5.7 },
  { id: "star-8", top: "24%", left: "28%", size: 1.9, opacity: 0.4, delay: 0.6, duration: 6.5 },
  { id: "star-9", top: "19%", left: "44%", size: 1.2, opacity: 0.33, delay: 2.2, duration: 4.9 },
  { id: "star-10", top: "21%", left: "62%", size: 1.6, opacity: 0.36, delay: 0.9, duration: 6.1 },
  { id: "star-11", top: "26%", left: "78%", size: 1.1, opacity: 0.26, delay: 1.8, duration: 5.1 },
  { id: "star-12", top: "29%", left: "91%", size: 1.4, opacity: 0.35, delay: 2.6, duration: 6 },
  { id: "star-13", top: "62%", left: "6%", size: 1.2, opacity: 0.32, delay: 1.5, duration: 5.4 },
  { id: "star-14", top: "58%", left: "18%", size: 1.5, opacity: 0.27, delay: 2.7, duration: 4.7 },
  { id: "star-15", top: "66%", left: "31%", size: 1.8, opacity: 0.39, delay: 0.7, duration: 6.3 },
  { id: "star-16", top: "69%", left: "47%", size: 1.2, opacity: 0.3, delay: 2.3, duration: 5.6 },
  { id: "star-17", top: "64%", left: "63%", size: 1.6, opacity: 0.34, delay: 1.1, duration: 4.5 },
  { id: "star-18", top: "71%", left: "79%", size: 1.2, opacity: 0.29, delay: 2.9, duration: 6.2 },
  { id: "star-19", top: "74%", left: "92%", size: 1.5, opacity: 0.37, delay: 0.4, duration: 5.8 },
  { id: "star-20", top: "84%", left: "14%", size: 1.4, opacity: 0.31, delay: 1.9, duration: 5.5 },
  { id: "star-21", top: "88%", left: "26%", size: 1.1, opacity: 0.24, delay: 0.5, duration: 4.8 },
  { id: "star-22", top: "82%", left: "41%", size: 1.6, opacity: 0.36, delay: 2.4, duration: 6.4 },
  { id: "star-23", top: "86%", left: "57%", size: 1.2, opacity: 0.33, delay: 1.4, duration: 5.2 },
  { id: "star-24", top: "90%", left: "73%", size: 1.8, opacity: 0.28, delay: 2.8, duration: 6.1 },
  { id: "star-25", top: "79%", left: "87%", size: 1.3, opacity: 0.35, delay: 1.3, duration: 5.7 },
  { id: "star-26", top: "48%", left: "4%", size: 1.5, opacity: 0.32, delay: 2.5, duration: 6.2, desktopOnly: true },
  { id: "star-27", top: "44%", left: "96%", size: 1.7, opacity: 0.3, delay: 0.3, duration: 5.3, desktopOnly: true },
  { id: "star-28", top: "32%", left: "15%", size: 1.1, opacity: 0.26, delay: 1.1, duration: 4.9, desktopOnly: true },
  { id: "star-29", top: "35%", left: "86%", size: 1.4, opacity: 0.33, delay: 2.2, duration: 5.8, desktopOnly: true },
  { id: "star-30", top: "78%", left: "49%", size: 1.9, opacity: 0.37, delay: 0.9, duration: 6.3, desktopOnly: true },
]);

const SPACE_COMETS = Object.freeze([
  {
    id: "comet-1",
    top: "11%",
    left: "-16%",
    length: 160,
    rotate: 10,
    startX: "0px",
    startY: "0px",
    endX: "1080px",
    endY: "120px",
    duration: 20,
    delay: 1.2,
  },
  {
    id: "comet-2",
    top: "18%",
    left: "102%",
    length: 140,
    rotate: 166,
    startX: "0px",
    startY: "0px",
    endX: "-950px",
    endY: "120px",
    duration: 23,
    delay: 7.2,
  },
  {
    id: "comet-3",
    top: "84%",
    left: "-12%",
    length: 130,
    rotate: -8,
    startX: "0px",
    startY: "0px",
    endX: "920px",
    endY: "-75px",
    duration: 24,
    delay: 4.6,
    desktopOnly: true,
  },
]);

const SPACE_ASTEROIDS = Object.freeze([
  { id: "asteroid-1", top: "16%", left: "27%", size: 28, opacity: 0.3, driftX: 14, driftY: -7, duration: 18, delay: 0.6, depth: 0 },
  { id: "asteroid-2", top: "70%", left: "82%", size: 22, opacity: 0.28, driftX: -16, driftY: -6, duration: 21, delay: 2.2, depth: 1 },
  { id: "asteroid-3", top: "86%", left: "21%", size: 18, opacity: 0.26, driftX: 11, driftY: -5, duration: 19, delay: 1.4, depth: 0 },
]);

const NEURAL_NODES = Object.freeze([
  { id: "n1", top: "22%", left: "16%", size: 4.5, opacity: 0.56, delay: 0.2, duration: 8.6, desktopOnly: true },
  { id: "n2", top: "30%", left: "26%", size: 3.6, opacity: 0.44, delay: 1.3, duration: 9.2 },
  { id: "n3", top: "20%", left: "84%", size: 4.6, opacity: 0.54, delay: 0.9, duration: 8.9, desktopOnly: true },
  { id: "n4", top: "31%", left: "74%", size: 3.8, opacity: 0.46, delay: 2.1, duration: 9.4 },
  { id: "n5", top: "66%", left: "14%", size: 4.2, opacity: 0.53, delay: 1.1, duration: 8.7 },
  { id: "n6", top: "74%", left: "25%", size: 3.5, opacity: 0.42, delay: 2.4, duration: 9.7 },
  { id: "n7", top: "68%", left: "86%", size: 4.3, opacity: 0.55, delay: 0.7, duration: 8.8 },
  { id: "n8", top: "76%", left: "75%", size: 3.7, opacity: 0.45, delay: 1.9, duration: 9.3 },
]);

const NEURAL_CONNECTIONS = Object.freeze([
  { id: "l1", top: "26%", left: "16%", width: "12%", rotate: 20, delay: 0.4, duration: 5.5 },
  { id: "l2", top: "24%", left: "73%", width: "12%", rotate: -22, delay: 1.1, duration: 5.8, desktopOnly: true },
  { id: "l3", top: "70%", left: "14%", width: "13%", rotate: 22, delay: 0.9, duration: 5.9 },
  { id: "l4", top: "72%", left: "74%", width: "12%", rotate: -20, delay: 1.8, duration: 5.6 },
  { id: "l5", top: "33%", left: "12%", width: "16%", rotate: 62, delay: 2.3, duration: 6.1, desktopOnly: true },
  { id: "l6", top: "34%", left: "88%", width: "16%", rotate: 118, delay: 2.8, duration: 6.2, desktopOnly: true },
]);

// Generate 140 stars with random distribution (seeded for consistency)
function generateStarField(count) {
  const stars = [];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitter = (i * 7919 + 31) % 100;
    const topJitter = ((jitter * 13) % 40) - 20;
    const leftJitter = ((jitter * 7) % 40) - 20;
    const top = Math.max(2, Math.min(98, (rows > 1 ? row / (rows - 1) : 0.5) * 96 + topJitter));
    const left = Math.max(2, Math.min(98, (cols > 1 ? col / (cols - 1) : 0.5) * 96 + leftJitter));
    stars.push({
      id: `star-${i}`,
      top: `${top}%`,
      left: `${left}%`,
      size: 2 + (jitter % 2),
      opacity: 0.5 + (jitter % 4) * 0.05,
      delay: (jitter % 25) * 0.15,
    });
  }
  return stars;
}

const STAR_FIELD = generateStarField(70);

const CELESTIAL_BODIES = Object.freeze([
  { id: "cb1", top: "18%", left: "12%", size: 100, color: "rgba(0,150,255,0.35)", blur: 80 },
  { id: "cb2", top: "78%", left: "85%", size: 90, color: "rgba(138,43,226,0.3)", blur: 70 },
]);

const SHOOTING_STARS = Object.freeze([
  { id: "ss1", top: "12%", angle: 28, delay: 0, duration: 8 },
  { id: "ss2", top: "48%", angle: -22, delay: 3, duration: 8 },
  { id: "ss3", top: "72%", angle: 18, delay: 6, duration: 8 },
]);

// Fiber-optic data lines — diagonal flowing streaks (bottom-left → top-right)
const FIBER_LINES = Object.freeze([
  { id: "fl1", top: "10%", duration: 12, delay: 0 },
  { id: "fl2", top: "25%", duration: 16, delay: 2 },
  { id: "fl3", top: "40%", duration: 20, delay: 4 },
  { id: "fl4", top: "55%", duration: 14, delay: 1 },
  { id: "fl5", top: "70%", duration: 18, delay: 3 },
  { id: "fl6", top: "85%", duration: 12, delay: 5 },
]);

function HeroFiberLinesLayer({ isMobile }) {
  const lines = isMobile ? FIBER_LINES.slice(0, 3) : FIBER_LINES;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {lines.map((line) => (
        <span
          key={line.id}
          className="hero-fiber-line"
          style={{
            top: line.top,
            "--fiber-duration": `${line.duration}s`,
            "--fiber-delay": `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Asteroids — 3 depth layers: small 4–6px (fast), medium 6–8px, large 8–10px (slow)
const ASTEROIDS = Object.freeze([
  { id: "a1", size: 5, color: "#7a7a7a", startX: "0%", startY: "5%", moveX: "110vw", moveY: "100vh", duration: 28, delay: 0 },
  { id: "a2", size: 8, color: "#9c9c9c", startX: "0%", startY: "95%", moveX: "110vw", moveY: "-100vh", duration: 38, delay: 4 },
  { id: "a3", size: 4, color: "#b3b3b3", startX: "100%", startY: "15%", moveX: "-110vw", moveY: "70vh", duration: 24, delay: 2 },
  { id: "a4", size: 7, color: "#7a7a7a", startX: "100%", startY: "75%", moveX: "-110vw", moveY: "-45vh", duration: 32, delay: 6 },
  { id: "a5", size: 6, color: "#9c9c9c", startX: "0%", startY: "45%", moveX: "110vw", moveY: "15vh", duration: 30, delay: 1 },
  { id: "a6", size: 9, color: "#7a7a7a", startX: "55%", startY: "0%", moveX: "-65vw", moveY: "110vh", duration: 40, delay: 8 },
  { id: "a7", size: 5, color: "#b3b3b3", startX: "0%", startY: "80%", moveX: "110vw", moveY: "-55vh", duration: 26, delay: 3 },
  { id: "a8", size: 7, color: "#9c9c9c", startX: "100%", startY: "50%", moveX: "-110vw", moveY: "5vh", duration: 34, delay: 5 },
]);

function HeroCosmicLayer({ isMobile }) {
  const starCount = isMobile ? 25 : 70;
  const stars = STAR_FIELD.slice(0, starCount);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Deep space gradient (slight transparency for depth) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(2,11,31,0.97) 0%, rgba(2,11,42,0.97) 50%, rgba(1,7,22,0.98) 100%)",
        }}
      />
      {/* Layer 2: Flowing fiber-optic lines */}
      <HeroFiberLinesLayer isMobile={isMobile} />
      {/* Layer 3: Star field */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="hero-space-star-dot hero-space-star-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--star-dot-opacity": s.opacity,
            "--star-dot-delay": `${s.delay}s`,
          }}
        />
      ))}
      {/* Celestial bodies — 2 glowing orbs */}
      {CELESTIAL_BODIES.map((cb) => (
        <div
          key={cb.id}
          className="hero-celestial-body"
          style={{
            top: cb.top,
            left: cb.left,
            width: `${cb.size}px`,
            height: `${cb.size}px`,
            background: `radial-gradient(circle, ${cb.color}, transparent 65%)`,
            filter: `blur(${cb.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}

function HeroShootingStarsLayer({ isMobile }) {
  if (isMobile) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {SHOOTING_STARS.map((ss) => (
        <span
          key={ss.id}
          className="hero-shooting-star"
          style={{
            top: ss.top,
            left: ss.left,
            "--shooting-star-angle": `${ss.angle}deg`,
            "--shooting-star-delay": `${ss.delay}s`,
            "--shooting-star-duration": `${ss.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function HeroAsteroidsLayer({ isMobile }) {
  const asteroids = isMobile ? ASTEROIDS.slice(0, 4) : ASTEROIDS;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {asteroids.map((a) => (
        <span
          key={a.id}
          className="hero-asteroid"
          style={{
            width: `${a.size}px`,
            height: `${a.size}px`,
            left: a.startX,
            top: a.startY,
            "--asteroid-color": a.color,
            "--asteroid-move-x": a.moveX,
            "--asteroid-move-y": a.moveY,
            "--asteroid-duration": `${a.duration}s`,
            "--asteroid-delay": `${a.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const MINIMAL_PARTICLES = Object.freeze([
  { id: "mp1", top: "12%", left: "18%", delay: 0, duration: 14 },
  { id: "mp2", top: "22%", left: "72%", delay: 2, duration: 16 },
  { id: "mp3", top: "35%", left: "8%", delay: 1, duration: 18 },
  { id: "mp4", top: "48%", left: "88%", delay: 3, duration: 15 },
  { id: "mp5", top: "62%", left: "14%", delay: 0.5, duration: 17 },
  { id: "mp6", top: "74%", left: "65%", delay: 2.5, duration: 13 },
  { id: "mp7", top: "18%", left: "45%", delay: 1.5, duration: 19 },
  { id: "mp8", top: "55%", left: "52%", delay: 4, duration: 14 },
  { id: "mp9", top: "82%", left: "32%", delay: 0.8, duration: 16 },
  { id: "mp10", top: "28%", left: "28%", delay: 2.2, duration: 15 },
]);

const MINIMAL_STREAKS = Object.freeze([
  { id: "ms1", top: "30%", angle: 0, delay: 0, duration: 22 },
  { id: "ms2", top: "58%", angle: 2, delay: 8, duration: 26 },
  { id: "ms3", top: "78%", angle: -1, delay: 14, duration: 24 },
]);

function HeroMinimalParticle({ particle, isMobile }) {
  return (
    <span
      className={`hero-minimal-particle ${isMobile ? "hero-minimal-particle-mobile" : ""}`}
      style={{
        top: particle.top,
        left: particle.left,
        "--particle-delay": `${particle.delay}s`,
        "--particle-duration": `${particle.duration}s`,
      }}
    />
  );
}

function HeroMinimalStreak({ streak, isMobile }) {
  if (isMobile) return null;
  return (
    <span
      className="hero-minimal-streak"
      style={{
        top: streak.top,
        "--streak-angle": `${streak.angle}deg`,
        "--streak-delay": `${streak.delay}s`,
        "--streak-duration": `${streak.duration}s`,
      }}
    />
  );
}

function HeroMinimalParticlesLayer({ isMobile }) {
  const particles = isMobile ? MINIMAL_PARTICLES.slice(0, 4) : MINIMAL_PARTICLES;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {particles.map((p) => (
        <HeroMinimalParticle key={p.id} particle={p} isMobile={isMobile} />
      ))}
      {MINIMAL_STREAKS.map((s) => (
        <HeroMinimalStreak key={s.id} streak={s} isMobile={isMobile} />
      ))}
    </div>
  );
}

function HeroSpaceStar({ star }) {
  return (
    <span
      className={`hero-space-star ${star.desktopOnly ? "hero-space-star-desktop-only" : ""}`}
      style={{
        top: star.top,
        left: star.left,
        "--star-size": `${star.size}px`,
        "--star-opacity": star.opacity,
        "--star-delay": `${star.delay}s`,
        "--star-duration": `${star.duration}s`,
      }}
    />
  );
}

function HeroSpaceComet({ comet }) {
  return (
    <span
      className={`hero-space-comet ${comet.desktopOnly ? "hero-space-comet-desktop-only" : ""}`}
      style={{
        top: comet.top,
        left: comet.left,
        "--comet-length": `${comet.length}px`,
        "--comet-rotate": `${comet.rotate}deg`,
        "--comet-start-x": comet.startX,
        "--comet-start-y": comet.startY,
        "--comet-end-x": comet.endX,
        "--comet-end-y": comet.endY,
        "--comet-duration": `${comet.duration}s`,
        "--comet-delay": `${comet.delay}s`,
      }}
    />
  );
}

function HeroSpaceAsteroid({ asteroid }) {
  return (
    <span
      className="hero-space-asteroid"
      style={{
        top: asteroid.top,
        left: asteroid.left,
        zIndex: asteroid.depth,
        "--asteroid-size": `${asteroid.size}px`,
        "--asteroid-opacity": asteroid.opacity,
        "--asteroid-drift-x": `${asteroid.driftX}px`,
        "--asteroid-drift-y": `${asteroid.driftY}px`,
        "--asteroid-duration": `${asteroid.duration}s`,
        "--asteroid-delay": `${asteroid.delay}s`,
      }}
    />
  );
}

function HeroMouseReactiveStarField() {
  const trackRef = useRef(null);
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    let isMobile = mediaQuery.matches;

    const syncMobileState = () => {
      isMobile = mediaQuery.matches;
      if (isMobile) {
        targetOffsetRef.current.x = 0;
        targetOffsetRef.current.y = 0;
        currentOffsetRef.current.x = 0;
        currentOffsetRef.current.y = 0;
        track.style.transform = "translate3d(0px, 0px, 0)";
      }
    };
    syncMobileState();

    const handleMouseMove = (event) => {
      if (isMobile) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      targetOffsetRef.current.x = x * STAR_REACT_X_MAX;
      targetOffsetRef.current.y = y * STAR_REACT_Y_MAX;
    };

    const handleMouseLeave = () => {
      targetOffsetRef.current.x = 0;
      targetOffsetRef.current.y = 0;
    };

    const animate = () => {
      const target = targetOffsetRef.current;
      const current = currentOffsetRef.current;
      current.x += (target.x - current.x) * 0.065;
      current.y += (target.y - current.y) * 0.065;

      track.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const onMediaChange = () => syncMobileState();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", onMediaChange);
    else mediaQuery.addListener(onMediaChange);

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", onMediaChange);
      else mediaQuery.removeListener(onMediaChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      <div ref={trackRef} className="hero-reactive-star-track">
        {SPACE_STARS.map((star) => (
          <HeroSpaceStar key={star.id} star={star} />
        ))}
      </div>
    </div>
  );
}

function HeroNeuralNode({ node }) {
  return (
    <span
      className={`hero-neural-node ${node.desktopOnly ? "hero-neural-desktop-only" : ""}`}
      style={{
        top: node.top,
        left: node.left,
        "--node-size": `${node.size}px`,
        "--node-opacity": node.opacity,
        "--node-delay": `${node.delay}s`,
        "--node-duration": `${node.duration}s`,
      }}
    />
  );
}

function HeroNeuralConnection({ line }) {
  return (
    <span
      className={`hero-neural-line ${line.desktopOnly ? "hero-neural-desktop-only" : ""}`}
      style={{
        top: line.top,
        left: line.left,
        width: line.width,
        transform: `rotate(${line.rotate}deg)`,
        "--neural-line-delay": `${line.delay}s`,
        "--neural-line-duration": `${line.duration}s`,
      }}
    >
      <span className="hero-neural-line-pulse" />
    </span>
  );
}

function HeroNeuralParticlesLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {NEURAL_CONNECTIONS.map((line) => (
        <HeroNeuralConnection key={line.id} line={line} />
      ))}
      {NEURAL_NODES.map((node) => (
        <HeroNeuralNode key={node.id} node={node} />
      ))}
      {SPACE_ASTEROIDS.map((asteroid) => (
        <HeroSpaceAsteroid key={asteroid.id} asteroid={asteroid} />
      ))}
    </div>
  );
}

function HeroRippleLayer({ ripples }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 6 }}
      aria-hidden="true"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="hero-ripple-wave absolute top-1/2 left-1/2"
          style={{ animationDuration: `${ripple.duration}ms` }}
        />
      ))}
    </div>
  );
}

function HeroConnectivityTowersLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
      {SPACE_COMETS.map((comet) => (
        <HeroSpaceComet key={comet.id} comet={comet} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero section
───────────────────────────────────────────── */
const Hero = () => {
  const isMobile = useIsMobile();
  const heroRef = useRef(null);
  const isHeroVisibleRef = useRef(false);
  const lastRippleAtRef = useRef(0);
  const rippleIdRef = useRef(0);
  const timeoutIdsRef = useRef([]);

  const [ripples, setRipples] = useState([]);

  const triggerRipple = useCallback(() => {
    const now = performance.now();
    if (now - lastRippleAtRef.current < RIPPLE_COOLDOWN_MS) return;
    lastRippleAtRef.current = now;

    const duration =
      RIPPLE_MIN_DURATION_MS + Math.random() * (RIPPLE_MAX_DURATION_MS - RIPPLE_MIN_DURATION_MS);
    const id = rippleIdRef.current + 1;
    rippleIdRef.current = id;

    setRipples((prev) => [...prev, { id, duration }]);

    const timeoutId = window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      timeoutIdsRef.current = timeoutIdsRef.current.filter((activeId) => activeId !== timeoutId);
    }, duration);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          setRipples([]);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(heroElement);

    const onWheel = () => {
      if (!isHeroVisibleRef.current) return;
      triggerRipple();
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, [triggerRipple]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-minimal-isp-bg relative min-h-screen pt-10 md:pt-12 lg:pt-16 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#061326] via-[#081A33] to-[#0A1F3C]"
    >
      {/* Layer 1: Cosmic gradient background */}
      <HeroCosmicLayer isMobile={isMobile} />

      {/* Layer 2: Star particles, celestial bodies, shooting stars */}
      <HeroShootingStarsLayer isMobile={isMobile} />

      {/* Layer 3: Asteroids */}
      <HeroAsteroidsLayer isMobile={isMobile} />

      {/* Layer 4: Holographic globe */}
      <div
        className={`absolute inset-0 z-[1] opacity-[0.92] ${isMobile ? "pointer-events-none" : "pointer-events-auto"
          }`}
        aria-hidden="true"
      >
        <NetworkGlobe isMobile={isMobile} />
      </div>

      <HeroMinimalParticlesLayer isMobile={isMobile} />

      <HeroRippleLayer ripples={ripples} />

      {/* Layer 5: Hero text */}
      <div className="relative z-10 w-full max-w-sm md:max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-5 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 inline-block" />
          <span className="text-xs font-semibold text-slate-300 tracking-[0.2em] uppercase">
            High-Speed Fiber Internet Provider
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-semibold md:font-black text-white leading-tight tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Blazing-Fast Internet,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-cyan-300 to-blue-400 text-[1.08em] md:text-[1em]">
            Delivered Pure.
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-slate-200/95 max-w-2xl leading-relaxed font-normal"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          Premium fiber connectivity with unlimited data, zero throttling,
          and speeds up to 300 Mbps — starting at just ₹699/month.
          Serving Hosur, Thalli &amp; Denkanikottai.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 w-full max-w-sm sm:max-w-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.58 }}
        >
          {/* Primary — solid */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 min-h-[52px] md:min-h-[52px] bg-accent-500 hover:bg-accent-400 text-white font-bold text-base md:text-lg rounded-full shadow-[0_4px_24px_rgba(6,182,212,0.45)] md:shadow-[0_0_28px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer sm:min-w-[176px] uppercase tracking-wide"
          >
            Explore Plans
          </motion.button>

          {/* Secondary — outlined */}
          <motion.a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 md:py-4 min-h-[48px] md:min-h-[52px] bg-transparent border-2 border-white/25 hover:border-white/60 hover:bg-white/5 text-white font-semibold md:font-bold text-sm md:text-lg rounded-full transition-all duration-300 cursor-pointer sm:min-w-[176px] uppercase tracking-wide"
          >
            <FaWhatsapp className="w-5 h-5 text-green-400" />
            Contact Us
          </motion.a>
        </motion.div>

      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 cursor-pointer select-none"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineArrowDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
