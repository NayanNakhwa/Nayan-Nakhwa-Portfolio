import React from "react";
import { Mail, Linkedin, Send } from "lucide-react";
import { resumeData } from "../../data/resume";
import { FadeIn } from "../ui/FadeIn";

export const Contact = () => {
  return (
    <section id="contact" className="mb-20">
      <FadeIn>
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
      </FadeIn>
    </section>
  );
};