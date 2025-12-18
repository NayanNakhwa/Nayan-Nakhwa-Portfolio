import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface SkillTagProps {
  name: string;
  category: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  index: number;
}

export const SkillTag: React.FC<SkillTagProps> = ({ name, category, mouseX, mouseY, index }) => {
  const factor = (index % 5 + 1) * 0.8;
  const direction = index % 2 === 0 ? 1 : -1;

  const x = useTransform(mouseX, (val: number) => (val * factor * direction) / 40);
  const y = useTransform(mouseY, (val: number) => (val * factor * direction) / 40);

  // Match categories from resume.ts
  let colorClass = "border-border/50 text-muted bg-surface/30";
  if (category === "Languages") colorClass = "border-primary/20 text-primary bg-primary/5";
  if (category === "Tools") colorClass = "border-secondary/20 text-secondary bg-secondary/5";

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