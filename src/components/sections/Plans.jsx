import { motion } from "framer-motion";
import { staggerContainer } from "../../hooks/useScrollAnimation";
import SectionTitle from "../ui/SectionTitle";
import PlanCard from "../ui/PlanCard";
import { plans } from "../../data/plans";

const Plans = () => {
  return (
    <section id="plans" className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Plans & Pricing"
          title="Choose Your Perfect Plan"
          description="Simple, transparent pricing with no hidden fees. All plans include unlimited data, free installation, and 24/7 support."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          * All prices exclusive of GST. Annual plans available with additional
          discounts.
        </motion.p>
      </div>
    </section>
  );
};

export default Plans;
