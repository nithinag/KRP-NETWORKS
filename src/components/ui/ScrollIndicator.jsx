import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
    >
      <span className="text-xs text-slate-400 tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <HiChevronDown className="w-6 h-6 text-accent-400" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
