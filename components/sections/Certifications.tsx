import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ShieldCheck, Hash, ChevronDown, X } from "lucide-react";
import { resumeData } from "../../data/resume";
import { FadeIn } from "../ui/FadeIn";
import { SpotlightCard } from "../ui/SpotlightCard";

export const Certifications = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <>
      <section id="certifications" className="mb-32">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">Credentials</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumeData.certifications.slice(0, 5).map((cert, idx) => (
            <FadeIn key={cert.id} delay={idx * 0.1}>
                <SpotlightCard className="group p-6 flex flex-col justify-between overflow-hidden min-h-[160px]">
                   {/* Decorative Background Element */}
                   <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
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
                </SpotlightCard>
            </FadeIn>
          ))}
          
          {/* View All Card */}
          <FadeIn delay={0.5} className="h-full">
              <button 
                onClick={() => setIsCertModalOpen(true)}
                className="w-full h-full group relative bg-surface/5 border border-dashed border-white/10 p-6 rounded-2xl hover:bg-surface/20 hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[160px]"
              >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted group-hover:text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                     <ChevronDown size={24} />
                  </div>
                  <span className="text-sm font-mono text-muted group-hover:text-text transition-colors">View All Credentials</span>
              </button>
          </FadeIn>
        </div>
      </section>

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
    </>
  );
};