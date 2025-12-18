import React, { useRef } from "react";
import { useMotionValue } from "framer-motion";
import { Cpu } from "lucide-react";
import { resumeData } from "../../data/resume";
import { SkillTag } from "../ui/SkillTag";

export const Skills = () => {
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

  return (
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
  );
};