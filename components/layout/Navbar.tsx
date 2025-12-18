import React from "react";
import { Github } from "lucide-react";
import { resumeData } from "../../data/resume";

export const Navbar = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset to account for the fixed navbar height + some breathing room
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-surface/70 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl shadow-black/50 flex items-center gap-6 md:gap-8 max-w-[95vw] overflow-x-auto scrollbar-hide">
        <div onClick={scrollToTop} className="font-mono font-bold tracking-tighter hover:text-primary transition-colors cursor-pointer shrink-0">
           NN<span className="text-primary">.</span>
        </div>
        
        <div className="h-4 w-[1px] bg-white/10 hidden md:block shrink-0"></div>
        
        <div className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium text-muted shrink-0">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-text transition-colors">About</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-text transition-colors">Exp</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-text transition-colors">Work</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-text transition-colors">Skills</a>
          <a href="#certifications" onClick={(e) => scrollToSection(e, 'certifications')} className="hover:text-text transition-colors">Certs</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-text transition-colors">Contact</a>
        </div>
        
        <div className="h-4 w-[1px] bg-white/10 hidden md:block shrink-0"></div>
        
        <a href={resumeData.personal.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors shrink-0">
          <Github size={18} />
        </a>
      </div>
    </nav>
  );
};