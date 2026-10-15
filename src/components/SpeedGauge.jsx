/**
 * SpeedGauge — Circular speedometer gauge for speed test dashboard style.
 * Animated progress ring, number count-up, label.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CYAN = "#00E5FF";

const SpeedGauge = ({ maxSpeed = 300, label = "Speed", size = 100, delay = 0, id }) => {
  const filterId = id || label.replace(/\s/g, "");
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 2500;
    const interval = 40;
    const timeoutRef = { current: null };
    const holdRef = { current: null };

    const tick = () => {
      frame += interval;
      const progress = Math.min(frame / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setValue(Math.round(eased * maxSpeed));
      if (progress < 1) {
        timeoutRef.current = setTimeout(tick, interval);
      } else {
        holdRef.current = setTimeout(() => {
          setValue(0);
          frame = 0;
          tick();
        }, 600);
      }
    };

    const startRef = setTimeout(() => tick(), delay);

    return () => {
      clearTimeout(startRef);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, [maxSpeed, delay]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = value / maxSpeed;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4 + delay * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 0.3,
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="-rotate-90"
        >
          <defs>
            <linearGradient id={`gaugeGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0099FF" stopOpacity="0.8" />
            </linearGradient>
            <filter id={`gaugeGlow-${filterId}`}>
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(0,229,255,0.15)"
            strokeWidth="2"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#gaugeGrad-${filterId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            filter={`url(#gaugeGlow-${filterId})`}
          />
        </svg>
        {/* Center number */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            color: CYAN,
            textShadow: `0 0 10px ${CYAN}90, 0 0 20px rgba(0,153,255,0.5)`,
          }}
        >
          <span className="text-lg sm:text-xl font-black tabular-nums leading-none">
            {value}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold mt-0.5 opacity-90">
            Mbps
          </span>
        </div>
      </div>
      <span
        className="mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider"
        style={{ color: CYAN, opacity: 0.85 }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default SpeedGauge;
