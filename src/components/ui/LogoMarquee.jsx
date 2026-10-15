import { motion } from "framer-motion";

// ─── Brand colours ────────────────────────────────────────────────────────────
const BRAND = {
  "Netflix": { bg: "#E50914", fg: "#fff" },
  "Prime Video": { bg: "#00A8E0", fg: "#fff" },
  "Disney+ Hotstar": { bg: "#1B3A8C", fg: "#fff" },
  "Sony LIV": { bg: "#2B5EE8", fg: "#fff" },
  "Zee5": { bg: "#7B2FBE", fg: "#fff" },
  "JioCinema": { bg: "#0152AF", fg: "#fff" },
  "Sun NXT": { bg: "#FF6600", fg: "#fff" },
  "Aha": { bg: "#FFCD00", fg: "#111" },
  "ManoramaMAX": { bg: "#E31E24", fg: "#fff" },
  "Hoichoi": { bg: "#E91E63", fg: "#fff" },
  "Lionsgate Play": { bg: "#FFCC00", fg: "#111" },
  "Discovery+": { bg: "#0071EB", fg: "#fff" },
  "Fancode": { bg: "#F04E37", fg: "#fff" },
  "Hungama": { bg: "#E91E63", fg: "#fff" },
  "Shemaroo": { bg: "#D32F2F", fg: "#fff" },
  "Star Sports": { bg: "#003087", fg: "#fff" },
  "Sun TV": { bg: "#FF6600", fg: "#fff" },
  "Zee Tamil": { bg: "#7B2FBE", fg: "#fff" },
  "Colors": { bg: "#C8102E", fg: "#fff" },
  "Discovery": { bg: "#0071EB", fg: "#fff" },
  "National Geo": { bg: "#FFCC00", fg: "#111" },
  "MTV": { bg: "#111", fg: "#fff" },
  "Star Plus": { bg: "#FF6A00", fg: "#fff" },
  "Sony Max": { bg: "#E31E24", fg: "#fff" },
  "Cartoon Network": { bg: "#005BBB", fg: "#fff" },
  "ESPN": { bg: "#B22222", fg: "#fff" },
  "History TV": { bg: "#8B4513", fg: "#fff" },
  // DTH
  "Tata Play": { bg: "#CB0000", fg: "#fff" },
  "Dish TV": { bg: "#F47920", fg: "#fff" },
  "Airtel Digital": { bg: "#E40000", fg: "#fff" },
  "Sun Direct": { bg: "#FF6600", fg: "#fff" },
  "300+ Channels": { bg: "#1e293b", fg: "#67e8f9" },
  "HD Packs": { bg: "#1e293b", fg: "#67e8f9" },
  "Sports Channels": { bg: "#064e3b", fg: "#6ee7b7" },
  "Regional TV": { bg: "#1e1b4b", fg: "#a5b4fc" },
  "Kids Channels": { bg: "#7c3aed", fg: "#fff" },
  "News 24×7": { bg: "#1e293b", fg: "#f8fafc" },
};

// ─── Brand logos (verified original URLs) ────────────────────────────────────
const LOGO_URLS = {
  // OTT
  "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "Prime Video": "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
  "Disney+ Hotstar": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Disney%2B_Hotstar_2024.svg",
  "Sony LIV": "https://upload.wikimedia.org/wikipedia/commons/f/f7/SonyLIV_2020.png",
  "Zee5": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Zee5_Logo_2018-2025.svg",
  "JioCinema": "https://upload.wikimedia.org/wikipedia/commons/1/14/Jiocinema.png",
  "Sun NXT": "https://upload.wikimedia.org/wikipedia/en/d/d5/Sun_NXT_logo_small.png",
  "Aha": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Aha_logo.svg",
  "ManoramaMAX": "https://upload.wikimedia.org/wikipedia/commons/0/00/Manorama_MAX_logo.png",
  "Hoichoi": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hoichoi-720p-transperant.png",
  "Lionsgate Play": "https://upload.wikimedia.org/wikipedia/commons/7/72/Lionsgate%2B.svg",
  "Discovery+": "https://upload.wikimedia.org/wikipedia/commons/6/61/Discovery_Plus_logo.svg",
  "Fancode": "https://upload.wikimedia.org/wikipedia/en/6/6c/FanCode_logo.svg",
  "Hungama": "https://upload.wikimedia.org/wikipedia/commons/b/be/Hungama.png",
  "Shemaroo": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Shemaroo_TV.png",

  // IPTV
  "Star Sports": "https://upload.wikimedia.org/wikipedia/commons/7/73/Star_Sports_1_HD.png",
  "Sun TV": "https://upload.wikimedia.org/wikipedia/commons/4/44/Sun_tv_logo.svg",
  "Zee Tamil": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Zee_Tamil_2025.svg",
  "Colors": "https://upload.wikimedia.org/wikipedia/commons/1/19/Colors_TV_logo.svg",
  "Discovery": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Discovery_Channel.png",
  "National Geo": "https://upload.wikimedia.org/wikipedia/commons/3/31/National_Geographic_Society_logo.svg",
  "MTV": "https://upload.wikimedia.org/wikipedia/commons/0/0d/MTV-2021.svg",
  "Star Plus": "https://upload.wikimedia.org/wikipedia/commons/7/71/Star%2B_logo.svg",
  "Sony Max": "https://upload.wikimedia.org/wikipedia/commons/1/10/Sony_MAX.svg",
  "Cartoon Network": "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg",
  "ESPN": "https://upload.wikimedia.org/wikipedia/commons/9/99/ESPN_logo.png",
  "History TV": "https://upload.wikimedia.org/wikipedia/commons/f/f5/History_Logo.svg",

  // DTH
  "Tata Play": "https://upload.wikimedia.org/wikipedia/commons/2/29/Tata_Play_2022_logo.svg",
  "Dish TV": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dish_TV_Logo.svg",
  "Airtel Digital": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg",
  "Sun Direct": "https://upload.wikimedia.org/wikipedia/commons/4/44/Sun_Direct_Max.png",

  // Firestick & Alexa
  "Amazon Fire TV": "https://upload.wikimedia.org/wikipedia/commons/9/98/Amazon_Fire_TV_2024.svg",
  "Alexa Built-in": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_Alexa_logo.svg"
};

const getBrand = (name) =>
  BRAND[name] ?? { bg: "rgba(255,255,255,0.09)", fg: "#e2e8f0" };

// ─── Logo Card ────────────────────────────────────────────────────────────────
const LogoCard = ({ logo, index, currentPlan }) => {
  const { bg, fg } = getBrand(logo.name);
  const Icon = logo.icon;
  const included = currentPlan && logo.plans?.includes(currentPlan);
  const logoUrl = LOGO_URLS[logo.name];

  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{
        width: 120,
        height: 70,
        borderRadius: 12,
        background: included ? "rgba(6,182,212,0.08)" : "#ffffff",
        border: `1px solid ${included ? "rgba(6,182,212,0.45)" : "rgba(15,23,42,0.08)"}`,
        boxShadow: included ? "0 0 15px rgba(6,182,212,0.20)" : "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
        animation: `logo-float 6s ease-in-out ${index * 0.25}s infinite`,
      }}
    >
      {/* Included badge */}
      {included && (
        <span
          className="absolute -top-2 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full z-20"
          style={{ background: "#06b6d4", color: "#fff", lineHeight: 1.4, letterSpacing: "0.02em" }}
        >
          Included
        </span>
      )}

      {/* Center logo rendering */}
      <div className="w-full h-full flex items-center justify-center p-3 select-none">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={logo.name}
            className="max-h-11 max-w-[85%] object-contain filter drop-shadow-md transition-all duration-300 hover:scale-105"
            onError={(e) => {
              // Hide image and display the fallback text pill
              e.target.style.display = 'none';
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Fallback Pill (or if logoUrl doesn't exist) */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
          style={{
            display: logoUrl ? 'none' : 'flex',
            background: bg,
            maxWidth: 95
          }}
        >
          <Icon style={{ width: 13, height: 13, color: fg, flexShrink: 0 }} />
          <span
            className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: fg, fontSize: 10.5, maxWidth: 68 }}
          >
            {logo.name}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const LogoMarquee = ({ logos, pricingBadge, currentPlan }) => {
  // Double for seamless infinite loop
  const doubled = [...logos, ...logos];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative pt-6 pb-2"
    >
      {/* Pricing badge */}
      {pricingBadge && (
        <div className="flex justify-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-accent-500 text-white text-xs sm:text-sm font-bold px-5 py-1.5 rounded-full shadow-lg shadow-accent-500/30 text-center animate-pulse"
          >
            {pricingBadge}
          </motion.div>
        </div>
      )}

      {/* Marquee wrapper */}
      <div className="marquee-container group relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        />

        {/* Scrolling track — pauses on hover via group */}
        <div
          className="marquee-track group-hover:[animation-play-state:paused] py-3"
          style={{ gap: 20, display: "flex" }}
        >
          {doubled.map((logo, i) => (
            <LogoCard
              key={`${logo.name}-${i}`}
              logo={logo}
              index={i % logos.length}
              currentPlan={currentPlan}
            />
          ))}
        </div>
      </div>

      {/* Legal disclaimer */}
      <p
        className="text-center mt-6"
        style={{ fontSize: 12, color: "#64748b", opacity: 0.8 }}
      >
        All trademarks and logos belong to their respective owners.
      </p>
    </motion.div>
  );
};

export default LogoMarquee;
