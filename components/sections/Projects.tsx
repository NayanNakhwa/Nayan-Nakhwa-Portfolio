import React from "react";
import { ExternalLink, Wifi, Bot, Globe, Code2, Layers } from "lucide-react";
import { resumeData } from "../../data/resume";

export const Projects = () => {
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
  );
};