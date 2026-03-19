"use client";

import { useReducedMotion, motion } from "framer-motion";
import { textRevealVariants } from "@/lib/data";

const headline = "From Data Analyst to Web Developer";
const subHeadline =
  "Data Science graduate from Telkom University (GPA 3.96, Summa Cum Laude), bridging analytical thinking with modern web development.";

const headlineWords = headline.split(" ");

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
        {prefersReducedMotion ? (
          headline
        ) : (
          headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))
        )}
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-10">
        {subHeadline}
      </p>

      <a
        href="#experience"
        className="inline-block px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        View Experience
      </a>
    </section>
  );
}
