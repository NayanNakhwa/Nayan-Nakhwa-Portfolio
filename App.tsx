import React, { useRef, useState } from "react";
import { resumeData } from "./data/resume";
import { motion as motionBase, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Folder, Cpu, Send, Award, X, Terminal, Globe, ArrowRight, ShieldCheck, Hash, Wifi, Bot, Code2, Layers } from "lucide-react";

const motion = motionBase as any;

const SkillTag = ({ name, category, mouseX, mouseY, index }: any) => {
  const factor = (index % 5 + 1) * 0.8; 
  const direction = index % 2 === 0 ? 1 : -1;

  const x = useTransform(mouseX, (val: number) => (val * factor * direction) / 40);
  const y = useTransform(mouseY, (val: number) => (val * factor * direction) / 40);

  let colorClass = "border-border/50 text-muted bg-surface/30";
  if (category === "Core Technical") colorClass = "border-primary/20 text-primary bg-primary/5";
  if (category === "Languages & Tools") colorClass = "border-secondary/20 text-secondary bg-secondary/5";

  return (
    <motion.button
      style={{ x, y }}
      whileHover={{ scale: 1.05, zIndex: 10, borderColor: "rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-4 py-2 rounded-lg border backdrop-blur-sm font-mono text-xs md:text-sm transition-colors cursor-default ${colorClass}`}
    >
      {name}
    </motion.button>
  );
};

function App() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleSkillsMouseMove = (e: React.MouseEvent) => {
    if (!skillsContainerRef.current) return;
    const rect = skillsContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const allSkills = resumeData.skills.flatMap(category => 
    category.skills.map(skill => ({ name: skill, category: category.title }))
  );

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to determine icons based on project type
  const getProjectConfig = (type: string) => {
    switch(type) {
      case "IoT": return { icon: <Wifi size={24} />, bgIcon: Wifi, color: "text-primary" };
      case "Automation": return { icon: <Bot size={24} />, bgIcon: Bot, color: "text-secondary" };
      case "Web": return { icon: <Globe size={24} />, bgIcon: Globe, color: "text-purple-400" };
      default: return { icon: <Code2 size={24} />, bgIcon: Layers, color: "text-muted" };
    }
  };

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/20 overflow-x-hidden">
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-surface/70 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl shadow-black/50 flex items-center gap-6 md:gap-8">
          <div onClick={scrollToTop} className="font-mono font-bold tracking-tighter hover:text-primary transition-colors cursor-pointer">
             NN<span className="text-primary">.</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="flex gap-6 text-xs md:text-sm font-medium text-muted">
            <a href="#about" className="hover:text-text transition-colors">About</a>
            <a href="#experience" className="hover:text-text transition-colors">Exp</a>
            <a href="#projects" className="hover:text-text transition-colors">Work</a>
            <a href="#contact" className="hover:text-text transition-colors">Contact</a>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
          <a href={resumeData.personal.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            <Github size={18} />
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO SECTION */}
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

        {/* BENTO GRID */}
        <section id="about" className="mb-32">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">About</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {/* Main Summary */}
            <div className="md:col-span-2 md:row-span-2 p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 group">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                 <Terminal size={20} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-text">The Engineer</h4>
              <p className="text-muted leading-relaxed font-light">
                {resumeData.personal.summary}
              </p>
              <div className="mt-8 flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between group">
              <h5 className="text-muted text-sm font-mono uppercase">Experience</h5>
              <div className="text-end">
                 <span className="text-6xl font-bold text-text tracking-tighter block group-hover:text-primary transition-colors">{resumeData.stats.yearsExperience}</span>
                 <span className="text-xs text-muted">+ Years</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between group">
              <h5 className="text-muted text-sm font-mono uppercase">Bugs Tracked</h5>
              <div className="text-end">
                 <span className="text-5xl font-bold text-text tracking-tighter block group-hover:text-secondary transition-colors">{resumeData.stats.bugsTracked}</span>
                 <span className="text-xs text-muted">+ Critical Issues</span>
              </div>
            </div>

            {/* Core Stack */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500">
               <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Cpu size={18} className="text-primary"/> 
                 Core Arsenal
               </h4>
               <div className="flex flex-wrap gap-2">
                 {resumeData.skills[0].skills.map(skill => (
                   <span key={skill} className="px-3 py-1.5 bg-white/5 rounded-md text-xs font-mono text-muted border border-white/5 hover:border-primary/30 hover:text-primary transition-colors">
                     {skill}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">Experience</span>
          </div>

          <div className="space-y-8 relative">
             <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-primary/50 via-border to-transparent"></div>
             
            {resumeData.experience.map((job) => (
              <div key={job.id} className="relative pl-12 group">
                <div className="absolute left-[15px] top-2 w-[9px] h-[9px] rounded-full bg-background border-2 border-primary z-10 group-hover:scale-125 transition-transform"></div>
                
                <div className="bg-surface/30 border border-white/5 rounded-2xl p-6 hover:bg-surface/50 hover:border-white/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h4 className="text-xl font-bold text-text">{job.role} <span className="text-muted font-normal">at {job.company}</span></h4>
                    <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">{job.period}</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {job.description.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-muted text-sm leading-relaxed">
                        <span className="text-primary mt-1.5 text-[10px]">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {job.skills.map(skill => (
                      <span key={skill} className="text-xs font-mono text-muted/60">#{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">Selected Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.projects.map((project) => {
              const { icon, bgIcon: BgIcon, color } = getProjectConfig(project.type);
              
              return (
                <div 
                  key={project.id} 
                  className="group relative bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-surface/50 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
                >
                  {/* Abstract Background Icon */}
                  <div className={`absolute -right-8 -bottom-8 ${color} opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none`}>
                     <BgIcon size={240} strokeWidth={0.5} />
                  </div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl bg-surface/80 backdrop-blur-md border border-white/5 ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {icon}
                      </div>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors p-2 hover:bg-white/5 rounded-full">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>

                    <h4 className="text-2xl font-bold mb-3 text-text group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-muted text-sm leading-relaxed mb-8 flex-grow font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-muted/90 bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-md backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS CLOUD */}
        <section 
          id="skills" 
          className="mb-32 relative"
          ref={skillsContainerRef}
          onMouseMove={handleSkillsMouseMove}
        >
          <div className="bg-surface/20 rounded-3xl p-8 border border-white/5 relative overflow-hidden backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-8 relative z-10">
               <div className="w-8 h-[1px] bg-primary"></div>
               <span className="text-primary font-mono text-sm uppercase tracking-widest">Skill Ecosystem</span>
            </div>

            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
              <Cpu size={300} />
            </div>

            <div className="flex flex-wrap justify-center gap-3 py-12 px-4 min-h-[300px] content-center relative z-10">
              {allSkills.map((skill, index) => (
                <SkillTag 
                  key={index}
                  name={skill.name}
                  category={skill.category}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="mb-32">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">Credentials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeData.certifications.slice(0, 5).map((cert, idx) => (
              <div 
                key={cert.id} 
                className="group relative bg-surface/20 backdrop-blur-sm border border-white/5 p-6 rounded-xl hover:bg-surface/40 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[160px]"
              >
                 {/* Decorative Background Element */}
                 <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Award size={80} strokeWidth={1} />
                 </div>
                 
                 {/* Tech Accents */}
                 <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>

                 <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                          {cert.date}
                       </span>
                       <ShieldCheck className="text-muted/20 group-hover:text-primary transition-colors" size={18} />
                    </div>

                    <h4 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors pr-4 flex-grow">
                      {cert.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/5">
                       <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-muted font-mono">
                          <Hash size={10} />
                       </div>
                       <p className="text-xs text-muted font-mono truncate">
                         {cert.issuer}
                       </p>
                    </div>
                 </div>
              </div>
            ))}
            
            {/* View All Card */}
            <button 
              onClick={() => setIsCertModalOpen(true)}
              className="group relative bg-surface/5 border border-dashed border-white/10 p-6 rounded-xl hover:bg-surface/20 hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[160px]"
            >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted group-hover:text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                   <ChevronDown size={24} />
                </div>
                <span className="text-sm font-mono text-muted group-hover:text-text transition-colors">View All Credentials</span>
            </button>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-20">
          <div className="bg-surface/30 rounded-3xl p-8 md:p-12 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-text">Ready to collaborate?</h3>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto font-light">
               I'm currently looking for new opportunities in QA Automation and IoT Engineering.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
               <a href={`mailto:${resumeData.personal.email}`} className="flex items-center gap-3 text-text bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-colors border border-white/5">
                 <Mail size={18} />
                 <span>{resumeData.personal.email}</span>
               </a>
               <a href={resumeData.personal.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-colors border border-white/5">
                 <Linkedin size={18} />
                 <span>LinkedIn</span>
               </a>
            </div>

            <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! This is a demo form."); }}>
               <div className="relative">
                  <input type="email" placeholder="Enter your email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted/50" />
               </div>
               <div className="relative">
                  <textarea rows={3} placeholder="How can I help you?" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors resize-none placeholder:text-muted/50"></textarea>
               </div>
               <button className="w-full py-3 bg-primary text-background font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                 Send Message <Send size={16} />
               </button>
            </form>
          </div>
        </section>

      </main>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-muted text-xs font-mono">Designed & Engineered by Nayan Nakhwa © 2025</p>
      </footer>

      {/* Certification Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsCertModalOpen(false)}
               className="absolute inset-0 bg-background/90 backdrop-blur-md"
             />
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-surface border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col"
             >
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surfaceHighlight/50">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-text">
                    <Award className="text-primary" size={20} />
                    All Certifications
                  </h3>
                  <button onClick={() => setIsCertModalOpen(false)} className="text-muted hover:text-text transition-colors p-2 hover:bg-white/5 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow bg-surface">
                  <div className="grid gap-3">
                    {resumeData.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/20 transition-colors group">
                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                            <Award size={18} />
                         </div>
                         <div className="flex-grow">
                           <h4 className="font-bold text-text text-sm">{cert.name}</h4>
                           <p className="text-xs text-muted">{cert.issuer}</p>
                         </div>
                         <div className="text-xs font-mono text-muted/60 whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                           {cert.date}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;