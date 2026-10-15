import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KrpLogo from "../../assets/KRP NETWORKS.svg";
import { Link } from "react-scroll";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const navLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Plans", to: "plans" },
  { name: "Services", to: "services" },
  { name: "Features", to: "features", mobileHidden: true },
  { name: "Coverage", to: "coverage" },
  { name: "Contact", to: "contact" },
];

const JUSTDIAL_URL =
  "https://www.justdial.com/Hosur/Krp-Networks-Near-Minda-Industries-Madagondapalli/9999P4344-4344-240816192631-J5D6_BZDET";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${scrolled
        ? "bg-slate-950/70 border-white/5 shadow-lg shadow-slate-900/20"
        : "bg-slate-950/30 border-white/5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={600}
          className="cursor-pointer flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={KrpLogo}
              alt="KRP Networks logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="flex flex-col justify-center gap-0.5 min-w-0">
            <span className="text-base md:text-xl font-bold text-white tracking-tight md:whitespace-nowrap">
              KRP <span className="text-accent-400">Networks</span>
            </span>
            <span className="text-[10px] md:text-xs leading-tight font-medium text-[#38bdf8]/90 max-w-[11rem] md:max-w-[13.5rem]">
              ULTIMATE CONNECTION FOR HOME
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={600}
              offset={-80}
              className={`text-[14px] lg:text-[15px] font-medium cursor-pointer transition-all duration-300 relative py-2 ${activeSection === link.to
                ? "text-white"
                : "text-slate-300 hover:text-white"
                }`}
            >
              {link.name}
              {activeSection === link.to && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side — Justdial + Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Justdial — always visible */}
          <motion.a
            href={JUSTDIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-semibold text-slate-900 shadow-md cursor-pointer"
            style={{ backgroundColor: "#FFC107" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#FFB300")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FFC107")}
            aria-label="Open Justdial profile"
          >
            Justdial
          </motion.a>

          {/* Hamburger — desktop small screens only (hidden on mobile, bottom nav handles it) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden sm:block md:hidden p-2 -mr-1 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — small tablets only (phones use bottom nav) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:block md:hidden bg-primary-950/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks
                .filter(link => !link.mobileHidden)
                .map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={600}
                    offset={-64}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-all duration-200 ${activeSection === link.to
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.name}
                    {activeSection === link.to && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400" />
                    )}
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
