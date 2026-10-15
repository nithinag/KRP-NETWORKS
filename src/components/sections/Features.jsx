import { motion } from "framer-motion";
import { staggerContainer } from "../../hooks/useScrollAnimation";
import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "../ui/FeatureCard";
import { features } from "../../data/features";

const Features = () => {
  return (
    <section id="features" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#030c1e] to-[#020815]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Why We Stand Out"
          title="Features Built for Speed"
          description="Everything you need for seamless internet — from blazing speeds to dedicated support, we've got you covered."
          light={true}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
