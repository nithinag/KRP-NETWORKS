import { motion } from "framer-motion";
import { HiOutlineHome, HiOutlineBuildingOffice2 } from "react-icons/hi2";

const icons = {
  home: HiOutlineHome,
  business: HiOutlineBuildingOffice2,
};

const CategoryToggle = ({ categories, activeCategory, onChange }) => {
  return (
    <div className="w-full sm:w-auto inline-flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 relative overflow-x-auto backdrop-blur-md">
      {categories.map((cat) => {
        const Icon = icons[cat.icon];
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap ${
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="categoryPill"
                className="absolute inset-0 bg-gradient-to-r from-accent-500 to-blue-500 rounded-xl shadow-lg shadow-accent-500/20"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryToggle;
