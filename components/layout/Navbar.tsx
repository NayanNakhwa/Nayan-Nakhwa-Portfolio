import React from "react";
import { Github } from "lucide-react";
import { resumeData } from "../../data/resume";

export const Navbar = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
  );
};