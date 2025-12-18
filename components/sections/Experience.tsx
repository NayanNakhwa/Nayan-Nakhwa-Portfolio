import React from "react";
import { resumeData } from "../../data/resume";
import { FadeIn } from "../ui/FadeIn";

export const Experience = () => {
  return (
    <section id="experience" className="mb-32">
      <FadeIn>
        <div className="flex items-center gap-4 mb-12">
           <div className="w-8 h-[1px] bg-primary"></div>
           <span className="text-primary font-mono text-sm uppercase tracking-widest">Experience</span>
        </div>
      </FadeIn>

      <div className="space-y-8 relative">
         {/* Vertical connector line */}
         <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-primary/50 via-border to-transparent"></div>
         
        {resumeData.experience.map((job, index) => (
          <FadeIn key={job.id} delay={index * 0.2}>
            <div className="relative pl-12 group">
              {/* Timeline Dot */}
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
          </FadeIn>
        ))}
      </div>
    </section>
  );
};