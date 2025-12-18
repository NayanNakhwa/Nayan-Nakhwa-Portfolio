import React from "react";
import { resumeData } from "./data/resume";
import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronDown } from "lucide-react";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/20">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-xl tracking-tighter">
            <span className="text-primary">&lt;</span>
            Nayan
            <span className="text-primary">/&gt;</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-muted">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex flex-col justify-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-primary mb-4">Hi, my name is</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-100 mb-4">
              {resumeData.personal.name}.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-muted mb-8">
              I build things ensuring <span className="text-secondary">quality</span>.
            </h2>
            <p className="max-w-xl text-lg text-slate-400 mb-10 leading-relaxed">
              I am an {resumeData.personal.title} specializing in building exceptional digital experiences and ensuring zero-defect deployments for high-scale systems.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 border border-primary text-primary rounded hover:bg-primary/10 transition-all font-mono">
                Check my Resume
              </button>
              <div className="flex gap-4 items-center px-4">
                <a href={resumeData.personal.socials.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Github size={24} /></a>
                <a href={resumeData.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* BENTO GRID (ABOUT & STATS) */}
        <section id="about" className="mb-32">
          <h3 className="section-heading mb-10 text-2xl font-bold flex items-center gap-4">
            <span className="text-primary font-mono">01.</span> About Me
            <span className="h-px bg-slate-700 flex-grow max-w-xs"></span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {/* Summary Block */}
            <div className="md:col-span-2 md:row-span-2 p-8 rounded-2xl bg-surface border border-slate-700/50 hover:border-primary/50 transition-colors group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">The Engineer</h4>
              <p className="text-slate-400 leading-relaxed mb-4">
                {resumeData.personal.summary}
              </p>
              <p className="text-slate-400 leading-relaxed">
                Starting with a foundation in Electronics & Telecommunication, I bridged the gap between hardware precision and software agility. Today, I focus on QA Automation and IoT Architecture.
              </p>
            </div>

            {/* Stats Block - Years */}
            <div className="p-8 rounded-2xl bg-surface border border-slate-700/50 flex flex-col justify-center items-center hover:border-primary/50 transition-colors">
              <span className="text-5xl font-bold text-primary mb-2">{resumeData.stats.yearsExperience}+</span>
              <span className="text-sm font-mono text-muted uppercase">Years Exp.</span>
            </div>

            {/* Stats Block - Bugs */}
            <div className="p-8 rounded-2xl bg-surface border border-slate-700/50 flex flex-col justify-center items-center hover:border-secondary/50 transition-colors">
              <span className="text-5xl font-bold text-secondary mb-2">{resumeData.stats.bugsTracked}+</span>
              <span className="text-sm font-mono text-muted uppercase">Bugs Squashed</span>
            </div>

            {/* Tech Stack Preview */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-surface border border-slate-700/50 hover:border-primary/50 transition-colors">
               <h4 className="text-xl font-bold mb-4">Core Arsenal</h4>
               <div className="flex flex-wrap gap-2">
                 {resumeData.skills[0].skills.map(skill => (
                   <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm font-mono text-primary border border-primary/20">
                     {skill}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mb-32">
           <h3 className="section-heading mb-10 text-2xl font-bold flex items-center gap-4">
            <span className="text-primary font-mono">02.</span> Experience
            <span className="h-px bg-slate-700 flex-grow max-w-xs"></span>
          </h3>

          <div className="space-y-12 border-l-2 border-slate-700 ml-3 pl-8 relative">
            {resumeData.experience.map((job) => (
              <div key={job.id} className="relative group">
                <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-4 border-background bg-slate-600 group-hover:bg-primary transition-colors"></span>
                
                <h4 className="text-xl font-bold text-slate-100">{job.role} <span className="text-primary">@ {job.company}</span></h4>
                <p className="font-mono text-sm text-muted mb-4">{job.period}</p>
                
                <ul className="space-y-2 mb-6">
                  {job.description.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-slate-400">
                      <span className="text-primary mt-1.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="text-xs font-mono text-primary/80">#{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="py-8 text-center text-slate-600 font-mono text-sm">
        <p>Designed & Built by Nayan Nakhwa</p>
      </footer>
    </div>
  );
}

export default App;