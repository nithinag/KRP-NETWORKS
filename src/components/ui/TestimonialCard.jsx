import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.15, ease: "easeOut" },
        },
      }}
      className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 hover:border-accent-400/40 hover:bg-slate-900/60 transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating ? "text-amber-400" : "text-white/10"
            }`}
          />
        ))}
      </div>
      <p className="text-slate-300 leading-relaxed mb-6 text-sm italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center text-accent-300 font-bold text-sm shadow-[inset_0_0_6px_rgba(34,211,238,0.2)]">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">
            {testimonial.name}
          </p>
          <p className="text-slate-400 text-xs">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
