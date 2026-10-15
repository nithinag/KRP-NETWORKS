import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi2";

const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-accent-300 transition-colors duration-200 pr-8">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-accent-500 text-white rotate-0"
              : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white rotate-0"
          }`}
        >
          {isOpen ? (
            <HiMinus className="w-4 h-4" />
          ) : (
            <HiPlus className="w-4 h-4" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-300 leading-relaxed pr-12 text-sm">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
