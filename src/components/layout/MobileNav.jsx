import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineCreditCard,
  HiOutlineWrenchScrewdriver,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const mobileNavLinks = [
  { name: "Home", to: "hero", icon: HiOutlineHome },
  { name: "About", to: "about", icon: HiOutlineInformationCircle },
  { name: "Plans", to: "plans", icon: HiOutlineCreditCard },
  { name: "Services", to: "services", icon: HiOutlineWrenchScrewdriver },
  { name: "Coverage", to: "coverage", icon: HiOutlineMapPin },
  { name: "Contact", to: "contact", icon: HiOutlinePhone },
];

const MobileNav = () => {
  const activeSection = useScrollSpy();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary-950/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {mobileNavLinks.map((link) => {
          const isActive = activeSection === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={600}
              offset={-64}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] cursor-pointer relative transition-colors duration-200"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                />
              )}
              <link.icon
                className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-accent-400" : "text-slate-400"
                  }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-200 leading-none ${isActive ? "text-accent-400" : "text-slate-500"
                  }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileNav;
