import React from "react";
import { Terminal, Cpu } from "lucide-react";
import { resumeData } from "../../data/resume";

export const About = () => {
  return (
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
             {/* Safe check for skills array */}
             {resumeData.skills.length > 0 && resumeData.skills[0].skills.map(skill => (
               <span key={skill} className="px-3 py-1.5 bg-white/5 rounded-md text-xs font-mono text-muted border border-white/5 hover:border-primary/30 hover:text-primary transition-colors">
                 {skill}
               </span>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};