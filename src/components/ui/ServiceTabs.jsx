import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

// ── Ripple helper ─────────────────────────────────────────────────────────────
const createRipple = (e) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${size}px; height:${size}px;
    left:${x}px; top:${y}px;
    background:rgba(255,255,255,0.22);
    transform:scale(0); animation:svc-ripple 0.45s ease-out forwards;
    z-index:0;
  `;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
};


// ─── Component ────────────────────────────────────────────────────────────────
const ServiceTabs = ({ tabs, activeTab, onChange }) => {
  const scrollRef = useRef(null);

  const handleClick = useCallback(
    (e, tabId) => {
      createRipple(e);
      onChange(tabId);
    },
    [onChange]
  );

  return (
    <>
      {/* Ripple keyframe */}
      <style>{`@keyframes svc-ripple { to { transform:scale(4); opacity:0; } }`}</style>

      {/*
        Layer 1 – overflow-hidden: hard clip, prevents page-level horizontal scroll
        Layer 2 – overflow-x-auto: the actual scrollable viewport for the tab strip
      */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto"
          style={{
            display: "flex",
            justifyContent: "center",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x proximity",
            scrollPaddingInline: 40,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "4px 16px 6px",
          }}
        >
          {/* Tab pill strip */}
          <div
            className="inline-flex items-center relative mx-auto"
            style={{
              background: "rgba(15,23,42,0.04)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: 20,
              padding: "6px",
              gap: "2px",
            }}
          >
            {/* Edge spacer — prevents last tab jamming against glass edge */}
            <span style={{ flex: "0 0 4px" }} aria-hidden="true" />

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={(e) => handleClick(e, tab.id)}
                  style={{
                    scrollSnapAlign: "center",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                  className={`
                    flex items-center justify-center gap-2
                    px-4 sm:px-6 py-2.5 sm:py-3
                    rounded-2xl text-xs sm:text-sm font-semibold
                    whitespace-nowrap cursor-pointer select-none
                    transition-colors duration-200
                    min-w-[88px] sm:min-w-[108px]
                    ${active ? "text-cyan-600 font-bold" : "text-slate-500 hover:text-slate-800"}
                  `}
                >
                  {/* Sliding glass pill */}
                  {active && (
                    <motion.div
                      layoutId="serviceGlassPill"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: "rgba(6,182,212,0.12)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(6,182,212,0.30)",
                        boxShadow:
                          "0 2px 12px rgba(6,182,212,0.15),inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Underline indicator */}
                  {active && (
                    <motion.div
                      layoutId="serviceUnderline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2"
                      style={{
                        height: 3,
                        width: "50%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg,#06b6d4,#0ea5e9)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Label */}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${active ? "scale-110" : "scale-100"
                        }`}
                    />
                    {tab.label}
                  </span>
                </button>
              );
            })}

            {/* Trailing edge spacer */}
            <span style={{ flex: "0 0 4px" }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceTabs;
