import { motion } from "framer-motion";
import { HiCheck, HiOutlineBolt } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import AnimatedPrice from "./AnimatedPrice";
import { getWhatsAppUrl } from "../../services/whatsappService";

const InteractivePlanCard = ({ plan, isAnnual, index, onClick }) => {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const monthlySaving = plan.monthlyPrice - plan.annualPrice;

  const whatsappMessage = `Hi, I'm interested in the KRP Networks ${plan.name} plan (${plan.speedLabel}, ₹${price}/month${isAnnual ? " - Annual" : ""}). Please share more details.`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => { if (onClick && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(); } }}
      className={`group relative rounded-2xl p-px transition-shadow duration-500 cursor-pointer ${plan.popular
          ? "shadow-2xl shadow-accent-500/25 hover:shadow-accent-500/35"
          : "shadow-xl shadow-slate-950/15 hover:shadow-2xl hover:shadow-accent-500/10"
        }`}
    >
      {/* Gradient border for popular */}
      {plan.popular && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-400 via-blue-500 to-accent-600 opacity-60" />
      )}

      <div
        className={`relative rounded-[15px] p-4 sm:p-5 lg:p-6 h-full flex flex-col backdrop-blur-md border transition-all duration-300 ${plan.popular
            ? "bg-slate-950/80 border-accent-400/30"
            : "bg-slate-900/45 border-white/10 hover:border-accent-400/30"
          }`}
      >
        {/* Popular badge */}
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.12 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-accent-500 to-blue-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-accent-500/30 uppercase tracking-wider">
              <HiOutlineBolt className="w-3 h-3" />
              Most Popular
            </span>
          </motion.div>
        )}

        {/* Plan name & speed */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-0.5 text-accent-300">
            {plan.name}
          </h3>
          <div className="text-2xl lg:text-3xl font-black leading-tight text-white">
            {plan.speedLabel}
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <AnimatedPrice
              value={price}
              className="text-3xl lg:text-4xl font-black tracking-tight text-white"
            />
            <span className="text-xs font-medium text-slate-400">
              /month
            </span>
          </div>

          {/* Annual savings indicator */}
          <motion.div
            initial={false}
            animate={{
              height: isAnnual ? "auto" : 0,
              opacity: isAnnual ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs font-semibold mt-1.5 text-green-400">
              You save ₹{monthlySaving * 12}/year
            </p>
          </motion.div>

          {isAnnual && (
            <p className="text-[11px] mt-0.5 text-slate-400">
              Billed ₹{plan.annualPrice * 12}/year
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-5 bg-white/10" />

        {/* Features */}
        <div className="space-y-2.5 mb-6 flex-grow">
          {plan.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-accent-500/20 text-accent-400 border border-accent-500/20">
                <HiCheck className="w-2.5 h-2.5" />
              </div>
              <span className="text-xs leading-relaxed text-slate-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${plan.popular
              ? "bg-gradient-to-r from-accent-500 to-blue-500 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
              : "bg-slate-800 text-white hover:bg-slate-700 shadow-md border border-white/5"
            }`}
        >
          <FaWhatsapp className="w-4 h-4" />
          Get Connected Now
        </motion.a>
      </div>
    </motion.div>
  );
};

export default InteractivePlanCard;
