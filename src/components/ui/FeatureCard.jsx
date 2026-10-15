import { motion } from "framer-motion";

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 hover:border-accent-400/40 hover:bg-slate-900/60 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-accent-500/10 flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:scale-110 transition-all duration-300 shadow-[inset_0_0_8px_rgba(34,211,238,0.15)]">
        <Icon className="w-7 h-7 text-accent-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">
        {feature.title}
      </h3>
      <p className="text-slate-300 leading-relaxed text-sm">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
