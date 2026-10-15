import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  fadeInUp,
} from "../../hooks/useScrollAnimation";
import { HiOutlineCalendar, HiOutlineUsers, HiOutlineMapPin } from "react-icons/hi2";

const stats = [
  { icon: HiOutlineCalendar, value: "26+", label: "Years of Service" },
  { icon: HiOutlineUsers, value: "10,000+", label: "Happy Customers" },
  { icon: HiOutlineMapPin, value: "50+", label: "Areas Covered" },
];

const AboutFiber = () => {
  return (
    <section id="about" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left - Content */}
          <motion.div variants={fadeInLeft}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 bg-slate-100 text-accent-600 border border-slate-200/50">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Built on Trust.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-blue-600">
                Powered by Fiber.
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              KRP NETWORKS, founded in 2000, is a trusted and customer-focused internet service provider delivering high-speed fiber broadband and wireless communication services across Hosur, Thalli and Denkanikottai. Serving homes, businesses, and clients in the entertainment industry, we ensure seamless connectivity for streaming, gaming, remote work, and digital content delivery.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              With robust fiber-optic infrastructure, unlimited high-speed plans without hidden fees or data caps, professional installation, and 24/7 customer support, we provide reliable, consistent performance that individuals and businesses can depend on every day.
            </p>

            {/* Stats Row */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="text-center p-5 rounded-2xl bg-white border border-slate-100 shadow-lg hover:border-accent-500/30 hover:shadow-xl transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-slate-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div variants={fadeInRight} className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-12 aspect-[4/3] sm:aspect-square flex items-center justify-center shadow-xl shadow-accent-500/5">
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-24 h-24 bg-accent-500/5 rounded-full blur-xl" />
              <div className="absolute bottom-6 left-6 w-32 h-32 bg-blue-500/5 rounded-full blur-xl" />

              <div className="relative z-10 text-center">
                <div className="text-6xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-accent-500 to-accent-700 leading-none">
                  KRP
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mt-2 tracking-wider">
                  NETWORKS
                </div>
                <div className="w-16 h-1 bg-accent-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                <p className="text-slate-500 mt-4 text-sm font-medium">
                  Your Internet. Your Speed.
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent-400/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent-400/30 rounded-br-3xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFiber;
