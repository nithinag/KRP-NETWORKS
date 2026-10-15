import { motion } from "framer-motion";
import { fadeInUp } from "../../hooks/useScrollAnimation";

const SectionTitle = ({ label, title, description, light = false }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-6 max-w-3xl mx-auto"
    >
      {label && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 ${
            light
              ? "bg-white/10 text-accent-300"
              : "bg-accent-500/10 text-accent-600"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          light ? "text-white" : "text-primary-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
