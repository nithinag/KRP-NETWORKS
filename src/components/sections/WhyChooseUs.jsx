import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../hooks/useScrollAnimation";
import SectionTitle from "../ui/SectionTitle";
import {
  HiOutlineSparkles,
  HiOutlineDevicePhoneMobile,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowsPointingOut,
} from "react-icons/hi2";

const reasons = [
  {
    icon: HiOutlineSparkles,
    title: "Unique Brand Identity",
    description:
      "We stand out from typical ISPs with a modern approach to internet service, built around trust and transparency.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: "User Experience",
    description:
      "From signup to support, every interaction is designed to be simple, fast, and hassle-free for our customers.",
  },
  {
    icon: HiOutlineCpuChip,
    title: "Responsive Design",
    description:
      "Our network adapts to your needs, whether you're streaming on one device or connecting an entire office.",
  },
  {
    icon: HiOutlineRocketLaunch,
    title: "Optimized Performance",
    description:
      "Fiber-optic infrastructure ensures consistent, high-speed connectivity with minimal latency at all times.",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: "SEO-Friendly",
    description:
      "Our digital presence is optimized so you can easily find us and access the best internet plans available.",
  },
  {
    icon: HiOutlineArrowsPointingOut,
    title: "Scalability",
    description:
      "Upgrade your plan anytime as your needs grow. Our infrastructure supports seamless speed upgrades.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#020815] to-[#041022] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Why Choose Us"
          title="The KRP Networks Advantage"
          description="We don't just provide internet — we deliver an experience built on speed, trust, and innovation."
          light={true}
        />
 
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="group relative bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 hover:border-accent-400/40 hover:bg-slate-900/60 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-blue-500/0 group-hover:from-accent-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
 
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-accent-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
