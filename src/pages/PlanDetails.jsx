import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiCheck,
  HiArrowLeft,
  HiOutlineWrenchScrewdriver,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiOutlineSignal,
  HiOutlineServerStack,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { plans } from "../data/plans";
import { getWhatsAppUrl } from "../services/whatsappService";
import { useState } from "react";

const PRODUCT_IMAGE = "https://placehold.co/480x320/0f172a/22d3ee?text=Router+%26+Fiber";

const BADGES = [
  { icon: HiOutlineWrenchScrewdriver, label: "Free Installation" },
  { icon: HiOutlineCube, label: "Router Included" },
  { icon: HiOutlineChartBar, label: "Unlimited Data" },
];

const ENTERPRISE_FEATURES = [
  { icon: HiOutlineBolt, label: "1 Gbps Speed", desc: "Symmetric fiber" },
  { icon: HiOutlineSignal, label: "Dedicated Line", desc: "Private connection" },
  { icon: HiOutlineServerStack, label: "Managed Equipment", desc: "Full support" },
  { icon: HiOutlineClock, label: "24/7 SLA Support", desc: "99.99% uptime" },
  { icon: HiOutlineGlobeAlt, label: "Static IP", desc: "5 addresses" },
  { icon: HiOutlineShieldCheck, label: "Security", desc: "Firewall & DDoS" },
  { icon: HiOutlineWrenchScrewdriver, label: "Installation", desc: "Professional setup" },
];

function getTagline(category, speed) {
  if (category === "business") return "Built for reliability and scale.";
  if (speed >= 200) return "Ultra-fast fiber for power users.";
  if (speed >= 100) return "Perfect balance of speed and value.";
  return "Reliable connectivity for everyday use.";
}

function EnterprisePlanLayout({ plan }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const monthlySaving = plan.monthlyPrice - plan.annualPrice;
  const whatsappMessage = `Hi, I'm interested in the KRP Networks ${plan.name} plan (${plan.speedLabel}, ₹${price}/month${isAnnual ? " - Annual" : ""}). Please share more details.`;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-primary-950 via-slate-900 to-primary-950 pb-24 md:pb-16 pt-20 md:pt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            to="/#plans"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to plans
          </Link>
        </motion.div>

        {/* Hero ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-400 mb-4"
            >
              Enterprise
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              {plan.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-2 text-accent-400 font-semibold text-xl"
            >
              {plan.speedLabel} Symmetric
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-slate-400 text-base max-w-md"
            >
              Dedicated fiber for businesses that demand reliability and performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex items-baseline gap-2"
            >
              <span className="text-4xl sm:text-5xl font-black text-white">₹{price}</span>
              <span className="text-slate-500 text-sm">/month</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <div className="flex rounded-lg bg-white/5 p-0.5 border border-white/10">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    !isAnnual ? "bg-accent-500/20 text-accent-400" : "text-slate-500"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isAnnual ? "bg-accent-500/20 text-accent-400" : "text-slate-500"
                  }`}
                >
                  Annual
                </button>
              </div>
              {isAnnual && (
                <span className="text-sm font-medium text-green-400">
                  Save ₹{monthlySaving * 12}/year
                </span>
              )}
            </motion.div>

            <motion.a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-base shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all"
            >
              <FaWhatsapp className="w-6 h-6" />
              Get Enterprise Quote on WhatsApp
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 lg:mt-0 lg:w-[400px] flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent pointer-events-none z-10" />
              <img
                src={PRODUCT_IMAGE}
                alt="Enterprise fiber setup"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Auto-scrolling feature showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 overflow-hidden"
        >
          <div className="marquee-container enterprise-marquee">
            <div className="marquee-track flex gap-6">
              {[...ENTERPRISE_FEATURES, ...ENTERPRISE_FEATURES].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-500/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400 group-hover:scale-110 group-hover:text-accent-300 transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features checklist ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8"
        >
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            What&apos;s included
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <HiCheck className="w-5 h-5 flex-shrink-0 text-accent-400 mt-0.5" />
                <span className="text-slate-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* WhatsApp CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready for enterprise-grade connectivity?
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            Chat with our team for a custom quote and tailored setup.
          </p>
          <motion.a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg shadow-xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow"
          >
            <FaWhatsapp className="w-6 h-6" />
            Connect on WhatsApp
          </motion.a>
        </motion.div>
      </div>

      {/* Sticky bottom CTA (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-primary-950/95 backdrop-blur-md border-t border-white/10 md:hidden z-40">
        <motion.a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold shadow-lg"
        >
          <FaWhatsapp className="w-5 h-5" />
          Get Connected — ₹{price}/mo
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function PlanDetails() {
  const { planId } = useParams();
  const [isAnnual, setIsAnnual] = useState(false);

  const plan = plans.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-slate-50 pt-20">
        <h1 className="text-2xl font-bold text-primary-950 mb-2">Plan not found</h1>
        <p className="text-slate-500 mb-6">The plan you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/#plans"
          className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700"
        >
          <HiArrowLeft className="w-4 h-4" />
          View all plans
        </Link>
      </div>
    );
  }

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const monthlySaving = plan.monthlyPrice - plan.annualPrice;
  const whatsappMessage = `Hi, I'm interested in the KRP Networks ${plan.name} plan (${plan.speedLabel}, ₹${price}/month${isAnnual ? " - Annual" : ""}). Please share more details.`;

  if (plan.id === "biz-enterprise") {
    return <EnterprisePlanLayout plan={plan} />;
  }

  const tagline = getTagline(plan.category, plan.speed);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen bg-slate-50 pb-24 md:pb-12 pt-20 md:pt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/#plans"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-950 font-medium text-sm mb-8 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to plans
        </Link>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-950 tracking-tight">
                {plan.name}
              </h1>
              <p className="mt-1.5 text-accent-600 font-semibold text-lg">{plan.speedLabel}</p>
              <p className="mt-2 text-slate-600 text-sm">{tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-primary-950">₹{price}</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      !isAnnual ? "bg-white text-primary-950 shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isAnnual ? "bg-white text-primary-950 shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Annual
                  </button>
                </div>
                {isAnnual && (
                  <span className="text-xs font-medium text-green-600">
                    Save ₹{monthlySaving * 12}/year
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-shadow"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Get Connected on WhatsApp
                </motion.a>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:border-primary-950 hover:text-primary-950 transition-colors"
                >
                  Other contact options
                </Link>
              </div>
            </div>

            <div className="lg:w-[380px] flex-shrink-0 relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-primary-950/5 via-accent-500/5 to-transparent">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent-500/10 rounded-2xl blur-2xl pointer-events-none" />
                <div className="relative rounded-xl overflow-hidden border border-slate-200/60">
                  <img
                    src={PRODUCT_IMAGE}
                    alt="Router and fiber setup"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {BADGES.map((b, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200/80 text-sm font-medium text-primary-950"
                  >
                    <b.icon className="w-4 h-4 text-accent-500" />
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/80 px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <HiCheck className="w-4 h-4 flex-shrink-0 text-accent-500 mt-0.5" />
                  <span className="text-slate-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden z-40">
        <motion.a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg"
        >
          <FaWhatsapp className="w-5 h-5" />
          Get Connected — ₹{price}/mo
        </motion.a>
      </div>
    </motion.div>
  );
}
