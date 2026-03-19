"use client";

import { motion } from "framer-motion";
import { cardVariants } from "@/lib/data";

export interface ExperienceCardProps {
  title: string;
  organization: string;
  dateRange: string;
  description: string;
  type: "work" | "education";
}

export default function ExperienceCard({
  title,
  organization,
  dateRange,
  description,
  type,
}: ExperienceCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        boxShadow: "0 0 0 2px #000",
        transition: { duration: 0.15 },
      }}
      className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold leading-snug">{title}</h3>
          <p className="text-sm text-gray-500">{organization}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            type === "education"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {type === "education" ? "Education" : "Work"}
        </span>
      </div>
      <p className="text-xs text-gray-400">{dateRange}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </motion.article>
  );
}
