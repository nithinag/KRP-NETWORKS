import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../hooks/useScrollAnimation";
import SectionTitle from "../ui/SectionTitle";
import FAQItem from "../ui/FAQItem";
import { faqs } from "../../data/faq";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#040d22] to-[#061326] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="FAQ"
          title="Frequently Asked Questions"
          description="Got questions? We've got answers. Find everything you need to know about KRP Networks."
          light={true}
        />
 
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 px-4 sm:px-8"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
