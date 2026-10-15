import { useState } from "react";
import { Link } from "react-scroll";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { HiArrowUp, HiChevronDown, HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import KrpLogo from "../../assets/KRP NETWORKS.svg";

const quickLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Plans", to: "plans" },
  { name: "Features", to: "features" },
  { name: "Coverage", to: "coverage" },
  { name: "Contact", to: "contact" },
];

const supportFaqs = [
  {
    id: "ott-1",
    question: "How many OTT platforms do you offer?",
    answer:
      "We provide access to over 15+ OTT platforms, giving you a wide variety of content options to choose from.",
  },
  {
    id: "ott-2",
    question: "Is there an additional cost for OTT services?",
    answer:
      "Our OTT bundle is available for just ₹1000/year with any KRP Networks plan. It is a great add-on for premium streaming content.",
  },
  {
    id: "ott-3",
    question: "How do I set up my OTT accounts?",
    answer:
      "Once your connection is active, contact our support team via WhatsApp or call us. We will guide you through each platform activation step by step.",
  },
  {
    id: "ott-4",
    question: "What should I do if streaming has issues?",
    answer:
      "First check your internet connection. If the issue continues, reach out to our 24/7 support team for quick help.",
  },
  {
    id: "ott-5",
    question: "Can I watch OTT on multiple devices?",
    answer:
      "Yes, you can stream on up to 2 devices at the same time, including smartphones, tablets, smart TVs, and computers.",
  },
  {
    id: "ott-6",
    question: "Can I cancel or change OTT subscriptions?",
    answer:
      "Yes, you can upgrade or downgrade your OTT plan at any time by contacting our support team.",
  },
];

const Footer = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [openSupportFaqId, setOpenSupportFaqId] = useState(null);

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={KrpLogo}
                  alt="KRP Networks logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                KRP <span className="text-accent-400">Networks</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm mb-6">
              Delivering lightning-fast fiber internet to homes and businesses.
              Experience uninterrupted connectivity with KRP Networks.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-all duration-300 text-slate-400 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={600}
                    offset={-48}
                    className="text-slate-400 hover:text-accent-400 transition-colors duration-200 cursor-pointer text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiPhone className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Call Us</p>
                  <a href="tel:+919632790919" className="text-sm text-white hover:text-accent-400 transition-colors">
                    +91 96327 90919
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiEnvelope className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:info@krpfibernet.com" className="text-sm text-white hover:text-accent-400 transition-colors">
                    info@krpfibernet.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiMapPin className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Service Areas</p>
                  <p className="text-sm text-white">Bangalore & Hosur</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Support FAQs */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <button
              onClick={() =>
                setIsFaqOpen((prev) => {
                  const next = !prev;
                  if (!next) setOpenSupportFaqId(null);
                  return next;
                })
              }
              className="w-full flex items-center justify-between text-left text-slate-300 hover:text-accent-400 transition-colors duration-200"
            >
              <span className="text-sm font-medium">FAQs</span>
              <HiChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isFaqOpen ? "rotate-180 text-accent-400" : ""
                  }`}
              />
            </button>
            {isFaqOpen && (
              <ul className="space-y-3 mt-4">
                {supportFaqs.map((faq) => (
                  <li
                    key={faq.id}
                    className="border-b border-white/10 last:border-b-0 pb-2"
                  >
                    <button
                      onClick={() =>
                        setOpenSupportFaqId((prev) =>
                          prev === faq.id ? null : faq.id
                        )
                      }
                      className="w-full flex items-start justify-between gap-3 py-2 text-left"
                    >
                      <span
                        className={`text-sm leading-relaxed transition-colors ${openSupportFaqId === faq.id
                          ? "text-accent-300"
                          : "text-slate-400 hover:text-accent-400"
                          }`}
                      >
                        {faq.question}
                      </span>
                      <HiChevronDown
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-transform duration-300 ${openSupportFaqId === faq.id
                          ? "rotate-180 text-accent-400"
                          : "text-slate-500"
                          }`}
                      />
                    </button>
                    {openSupportFaqId === faq.id && (
                      <p className="text-xs text-slate-500 leading-relaxed pr-7 pb-2">
                        {faq.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} KRP Networks. All rights reserved.
          </p>
          <Link
            to="hero"
            smooth={true}
            duration={800}
            className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer text-slate-400 hover:text-white"
          >
            <HiArrowUp className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
