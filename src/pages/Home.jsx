import Hero from "../components/sections/Hero";
import AboutFiber from "../components/sections/AboutFiber";
import ChoosePlan from "../components/sections/ChoosePlan";
import Services from "../components/sections/Services";
import Features from "../components/sections/Features";
import Coverage from "../components/sections/Coverage";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutFiber />
      <ChoosePlan />
      <Services />
      <Features />
      <Coverage />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
