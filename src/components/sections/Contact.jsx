import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "../../hooks/useScrollAnimation";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button";
import { sendEmail } from "../../services/emailService";
import { getWhatsAppUrl } from "../../services/whatsappService";

const contactInfo = [
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: "+91 96327 90919",
    href: "tel:+919632790919",
  },
  {
    icon: HiOutlineEnvelope,
    label: "Email",
    value: "info@krpfibernet.com",
    href: "mailto:info@krpfibernet.com",
  },
  {
    icon: HiOutlineMapPin,
    label: "Service Area",
    value: "Hosur, Thalli & Denkanikottai.",
    href: null,
  },
  {
    icon: HiOutlineClock,
    label: "Support",
    value: "24/7 Available",
    href: null,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else {
      setStatus("error");
    }

    setLoading(false);
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#061326] to-[#010915] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left - Form */}
          <motion.div variants={fadeInLeft}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 bg-white/10 text-accent-300">
              Contact us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to Get Connected?
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Fill out the form below and our team will get back to you within 24
              hours. Or reach out directly via WhatsApp for instant support.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all duration-200 text-sm bg-white/5 focus:bg-white/10 text-white placeholder-slate-500"
                    placeholder="Pillapa"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all duration-200 text-sm bg-white/5 focus:bg-white/10 text-white placeholder-slate-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all duration-200 text-sm bg-white/5 focus:bg-white/10 text-white placeholder-slate-500"
                  placeholder="pillapa@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all duration-200 text-sm bg-white/5 focus:bg-white/10 text-white placeholder-slate-500 resize-none"
                  placeholder="I'm interested in your fiber internet plans..."
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                type="submit"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm font-medium"
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-medium"
                >
                  Something went wrong. Please try WhatsApp or call us directly.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Right - Contact Info & WhatsApp */}
          <motion.div variants={fadeInRight}>
            <div className="bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 h-full shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-5 mb-8">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-accent-400 transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaWhatsapp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white font-bold">Quick Connect</p>
                    <p className="text-green-300 text-sm">
                      Get instant response on WhatsApp
                    </p>
                  </div>
                </div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 w-full justify-center"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
