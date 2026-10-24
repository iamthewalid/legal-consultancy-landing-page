import { motion, useScroll, useSpring } from "framer-motion";
import { ContactDock, LeftRail, Nav } from "./components/Chrome";
import Hero from "./components/Hero";
import { Services, Why } from "./components/Services";
import { Videos } from "./components/Videos";
import { Compare, Process } from "./components/Compare";
import { Founder, Plans, Testimonials } from "./components/Founder";
import { Booking, Contact, Faq, Footer } from "./components/Booking";

export default function App() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen bg-[#071319]">
      <motion.div
        style={{ scaleX: bar }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-[#8c6e15] via-[#e7c766] to-[#c9a227]"
      />
      <LeftRail />
      <Nav />
      <ContactDock />

      <main className="xl:pl-14">
        <Hero />
        <Services />
        <Why />
        <Compare />
        <Videos />
        <Process />
        <Founder />
        <Testimonials />
        <Plans />
        <Booking />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
