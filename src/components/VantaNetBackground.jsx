/**
 * VantaNetBackground — Animated network visualization using Vanta.js NET.
 * Represents internet connectivity with nodes and connecting lines.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaNetBackground() {
  const containerRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const initVanta = async () => {
      if (typeof window !== "undefined") window.THREE = THREE;
      const NET = (await import("vanta/dist/vanta.net.min")).default;
      if (!containerRef.current) return;

      const isMobile = window.innerWidth < 768;
      vantaRef.current = NET({
        el: containerRef.current,
        THREE,
        color: 0x22d3ee,
        backgroundColor: 0x020617,
        points: isMobile ? 8 : 12,
        maxDistance: isMobile ? 18 : 24,
        spacing: isMobile ? 14 : 18,
        showDots: true,
        mouseControls: !isMobile,
        touchControls: true,
        gyroControls: false,
        scaleMobile: 0.8,
      });
    };

    initVanta();

    const handleResize = () => {
      vantaRef.current?.resize?.();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-screen"
      aria-hidden="true"
    />
  );
}
