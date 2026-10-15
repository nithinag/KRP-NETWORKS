import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../../hooks/useScrollAnimation";
import CategoryToggle from "../ui/CategoryToggle";
import BillingToggle from "../ui/BillingToggle";
import InteractivePlanCard from "../ui/InteractivePlanCard";
import { plans, categories } from "../../data/plans";

const ChoosePlan = () => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const filteredPlans = useMemo(
    () => plans.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="plans"
      className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#081730] to-[#051228] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-5 bg-white/10 text-accent-300">
            Plans & Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transparent pricing. No hidden fees. Switch between Home & Business
            to find your ideal speed.
          </p>
        </motion.div>

        {/* ── Controls Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6"
        >
          <CategoryToggle
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </motion.div>

        {/* ── Plan Cards ── */}
        <div className="relative min-h-0 sm:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch max-w-7xl mx-auto"
            >
              {filteredPlans.map((plan, index) => (
                <InteractivePlanCard
                  key={plan.id}
                  plan={plan}
                  isAnnual={isAnnual}
                  index={index}
                  onClick={() => navigate(`/plans/${plan.id}`)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 space-y-2"
        >
          <p className="text-slate-400 text-sm">
            All prices exclusive of GST. Annual plans billed yearly at the
            discounted rate.
          </p>
          <p className="text-slate-400 text-sm">
            Need a custom plan?{" "}
            <a
              href="#contact"
              className="text-accent-500 font-semibold hover:text-accent-600 transition-colors underline underline-offset-2"
            >
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChoosePlan;
