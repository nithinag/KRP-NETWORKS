import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../../hooks/useScrollAnimation";
import ServiceTabs from "../ui/ServiceTabs";
import LogoMarquee from "../ui/LogoMarquee";
import ServiceBenefitCard from "../ui/ServiceBenefitCard";
import Button from "../ui/Button";
import { services } from "../../data/services";
import { getWhatsAppUrl } from "../../services/whatsappService";
import { FaWhatsapp } from "react-icons/fa";

const Services = () => {
  const [activeTab, setActiveTab] = useState("ott");

  const activeService = useMemo(
    () => services.find((s) => s.id === activeTab),
    [activeTab]
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = services.map((s) => ({
    id: s.id,
    label: s.label,
    icon: s.icon,
  }));

  return (
    <section id="services" className="overflow-hidden">
      {/* ────────── Light Hero + Tabs + Marquee Zone ────────── */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-white relative">
        {/* Background accents */}
        <div className="absolute top-20 -left-40 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 bg-slate-100 text-accent-600 border border-slate-200/50">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Get All-in-One{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-blue-600">
                Services
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              15+ OTT Apps, IPTV, Landline & Firestick — everything bundled with
              your KRP Networks plan.
            </p>
          </motion.div>

          {/* Service Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <ServiceTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={handleTabChange}
            />
          </motion.div>

          {/* Logo Marquee */}
          <AnimatePresence mode="wait">
            <LogoMarquee
              key={`marquee-${activeTab}`}
              logos={activeService.logos}
              pricingBadge={activeService.pricingBadge}
            />
          </AnimatePresence>
        </div>

        {/* Gradient transition to content section */}
        <div className="h-8 bg-gradient-to-b from-white to-slate-50" />
      </div>

      {/* ────────── Light Content Zone ────────── */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeTab}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* ── Service Detail: Illustration + Description ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-8">
                {/* Left — Visual card */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-14 aspect-[4/3] flex items-center justify-center shadow-xl">
                    {/* Decorative orbs */}
                    <div className="absolute top-6 right-6 w-28 h-28 bg-accent-500/10 rounded-full blur-xl" />
                    <div className="absolute bottom-6 left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />

                    <div className="relative z-10 text-center">
                      <activeService.icon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-accent-500 mx-auto mb-4" />
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 leading-none">
                        {activeService.label}
                      </div>
                      <div className="w-16 h-1 bg-accent-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                      <p className="text-slate-500 mt-4 text-sm max-w-xs mx-auto font-medium">
                        {activeService.pricingBadge}
                      </p>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent-400/30 rounded-tl-3xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent-400/30 rounded-br-3xl" />
                  </div>
                </div>

                {/* Right — Description */}
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {activeService.headline}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-6">
                    {activeService.description}
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    href={getWhatsAppUrl(
                      `Hi, I'm interested in KRP Networks' ${activeService.label} service. Please share details.`
                    )}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Enquire Now
                  </Button>
                </div>
              </div>

              {/* ── Benefits Grid ── */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-6">
                  Benefits of {activeService.label} Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeService.benefits.map((benefit, index) => (
                    <ServiceBenefitCard
                      key={`${activeTab}-benefit-${index}`}
                      benefit={benefit}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
