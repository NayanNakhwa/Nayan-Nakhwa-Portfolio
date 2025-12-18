import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Certifications } from "./components/sections/Certifications";
import { Contact } from "./components/sections/Contact";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/20 overflow-x-hidden">
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;