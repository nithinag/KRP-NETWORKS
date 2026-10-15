import { motion } from "framer-motion";

const BillingToggle = ({ isAnnual, onChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <span
        className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
          !isAnnual ? "text-white" : "text-slate-400"
        }`}
      >
        Monthly
      </span>
 
      <button
        onClick={() => onChange(!isAnnual)}
        className={`relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
          isAnnual ? "bg-accent-500" : "bg-white/10"
        }`}
        aria-label={isAnnual ? "Switch to monthly billing" : "Switch to annual billing"}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: isAnnual ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
 
      <span
        className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
          isAnnual ? "text-white" : "text-slate-400"
        }`}
      >
        Annual
      </span>
 
      <motion.span
        initial={{ opacity: 0, scale: 0.8, x: -8 }}
        animate={{
          opacity: isAnnual ? 1 : 0,
          scale: isAnnual ? 1 : 0.8,
          x: isAnnual ? 0 : -8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full"
      >
        Save up to 20%
      </motion.span>
    </div>
  );
};

export default BillingToggle;
