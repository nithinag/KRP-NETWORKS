import { motion } from "framer-motion";
import { staggerContainer } from "../../hooks/useScrollAnimation";
import SectionTitle from "../ui/SectionTitle";
import TestimonialCard from "../ui/TestimonialCard";
import { testimonials } from "../../data/testimonials";

const Testimonials = () => {
  return (
    <section id="testimonials" className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#041022] to-[#040d22] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Testimonials"
          title="What Our Customers Say"
          description="Thousands of happy customers trust KRP Networks for their internet needs. Here's what they have to say."
          light={true}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
