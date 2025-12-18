import React from "react";
import { Cpu } from "lucide-react";
import { SkillGraph } from "../ui/SkillGraph";
import { FadeIn } from "../ui/FadeIn";

export const Skills = () => {
  return (
    <section id="skills" className="mb-32 relative">
      <FadeIn>
        <div className="flex items-center gap-4 mb-8">
             <div className="w-8 h-[1px] bg-primary"></div>
             <span className="text-primary font-mono text-sm uppercase tracking-widest">Skill Ecosystem</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="relative h-[450px] md:h-[600px]">
         {/* Decorative Icon Background */}
         <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] pointer-events-none">
            <Cpu size={300} />
         </div>

         <SkillGraph />
      </FadeIn>
    </section>
  );
};