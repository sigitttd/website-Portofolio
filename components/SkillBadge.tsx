"use client";

import { motion } from "framer-motion";
import { badgeVariants } from "@/lib/data";

export interface SkillBadgeProps {
  name: string;
  category: "existing" | "new";
}

export default function SkillBadge({ name, category }: SkillBadgeProps) {
  return (
    <motion.span
      variants={badgeVariants}
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
        category === "existing"
          ? "bg-gray-100 text-gray-700"
          : "bg-black text-white"
      }`}
    >
      {name}
    </motion.span>
  );
}
