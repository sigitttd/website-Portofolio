"use client";

import { useReducedMotion, motion } from "framer-motion";
import { skills, staggerContainer, badgeVariants } from "@/lib/data";
import SkillBadge from "./SkillBadge";

export default function SkillBridgeSection() {
  const prefersReducedMotion = useReducedMotion();

  const existingSkills = [...skills]
    .filter((s) => s.category === "existing")
    .sort((a, b) => a.order - b.order);

  const newSkills = [...skills]
    .filter((s) => s.category === "new")
    .sort((a, b) => a.order - b.order);

  function SkillGroup({ items }: { items: typeof skills }) {
    if (prefersReducedMotion) {
      return (
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
          ))}
        </div>
      );
    }
    return (
      <motion.div
        className="flex flex-wrap gap-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
        ))}
      </motion.div>
    );
  }

  return (
    <section id="skill-bridge" className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Skills</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Existing Skills
          </h3>
          <SkillGroup items={existingSkills} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            New Tech Stack
          </h3>
          <SkillGroup items={newSkills} />
        </div>
      </div>
    </section>
  );
}
