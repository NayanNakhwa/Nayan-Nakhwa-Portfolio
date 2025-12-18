import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { resumeData } from "../../data/resume";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const Hero = () => {
  return (
    <section className="min-h-[75vh] flex flex-col justify-center mb-24 md:mb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Pill */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono font-medium mb-8 w-fit">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Available for new opportunities
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter text-text mb-6 leading-[0.9]">
          {resumeData.personal.name}
        </motion.h1>
        
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-10">
           <h2 className="text-2xl md:text-3xl font-medium text-muted tracking-tight">
            {resumeData.personal.title}
           </h2>
           <div className="h-px bg-border flex-grow mb-4 hidden md:block"></div>
        </motion.div>

        <motion.p variants={itemVariants} className="max-w-2xl text-lg text-muted mb-10 leading-relaxed font-light">
          Specializing in <span className="text-text font-medium">zero-defect deployments</span> and <span className="text-text font-medium">IoT Architecture</span>. 
          Bridging the gap between hardware precision and software agility to build exceptional digital experiences.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4">
          <button className="px-6 py-3 bg-text text-background font-medium rounded-lg hover:bg-primary hover:text-background transition-all flex items-center gap-2">
            Download Resume <ArrowRight size={16} />
          </button>
          <a href="#contact" className="px-6 py-3 border border-border text-muted rounded-lg hover:text-text hover:border-text transition-all font-medium">
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};