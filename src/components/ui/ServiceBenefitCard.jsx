import { motion } from "framer-motion";

const ServiceBenefitCard = ({ benefit, index }) => {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.45,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:border-accent-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-accent-500/10 flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:scale-110 transition-all duration-300 shadow-[inset_0_0_8px_rgba(34,211,238,0.15)]">
        <Icon className="w-7 h-7 text-accent-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2">
        {benefit.title}
      </h4>
      <p className="text-slate-500 leading-relaxed text-sm">
        {benefit.description}
      </p>
    </motion.div>
  );
};

export default ServiceBenefitCard;
