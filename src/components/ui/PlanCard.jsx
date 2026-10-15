import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";
import Button from "./Button";
import { getWhatsAppUrl } from "../../services/whatsappService";

const PlanCard = ({ plan, index }) => {
  const whatsappMessage = `Hi, I'm interested in the ${plan.name} plan (${plan.speed} at ₹${plan.price}/month). Please share more details.`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -8 }}
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        plan.popular
          ? "bg-primary-950 text-white shadow-2xl shadow-primary-950/30 scale-105 border-2 border-accent-500/50"
          : "bg-white text-slate-800 shadow-lg hover:shadow-2xl border border-slate-100"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-accent-500 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-lg shadow-accent-500/30">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3
          className={`text-xl font-bold mb-2 ${
            plan.popular ? "text-accent-300" : "text-primary-950"
          }`}
        >
          {plan.name}
        </h3>
        <div className="mb-2">
          <span
            className={`text-sm font-medium ${
              plan.popular ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Up to
          </span>
          <div
            className={`text-4xl font-black ${
              plan.popular ? "text-white" : "text-primary-950"
            }`}
          >
            {plan.speed}
          </div>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span
            className={`text-4xl font-black ${
              plan.popular ? "text-accent-400" : "text-accent-500"
            }`}
          >
            ₹{plan.price}
          </span>
          <span
            className={`text-sm ${
              plan.popular ? "text-slate-400" : "text-slate-500"
            }`}
          >
            /{plan.period}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <HiCheck
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                plan.popular ? "text-accent-400" : "text-accent-500"
              }`}
            />
            <span
              className={`text-sm ${
                plan.popular ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={plan.popular ? "primary" : "outline"}
        size="md"
        href={getWhatsAppUrl(whatsappMessage)}
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
};

export default PlanCard;
