// lib/data.ts — Static content data for the portfolio website

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  description: string;
  type: "work" | "education";
  order: number; // ascending = reverse-chronological (1 = most recent)
}

export interface Skill {
  name: string;
  category: "existing" | "new";
  order: number; // existing: 1–9, new: 10–14
}

// ─── Static Data ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "bi-marketing",
    title: "Junior Business Intelligence",
    organization: "Marketing Agency",
    dateRange: "Nov 2025 – Mar 2026",
    description:
      "Membangun dashboard BI dan laporan analitik untuk mendukung keputusan strategi pemasaran.",
    type: "work",
    order: 1,
  },
  {
    id: "freelance-da",
    title: "Freelance Data Analyst",
    organization: "Independent",
    dateRange: "2024 – 2025",
    description:
      "Mengerjakan proyek analisis data untuk berbagai klien, mulai dari data cleaning hingga visualisasi insight.",
    type: "work",
    order: 2,
  },
  {
    id: "kuanta-intern",
    title: "Data Analyst Intern",
    organization: "Kuanta Indonesia",
    dateRange: "2024",
    description:
      "Melakukan analisis data operasional dan membantu pengembangan pipeline data untuk kebutuhan bisnis.",
    type: "work",
    order: 3,
  },
  {
    id: "ta-telkom",
    title: "Teaching Assistant",
    organization: "Telkom University",
    dateRange: "2023 – 2024",
    description:
      "Mendampingi mahasiswa dalam mata kuliah Data Science dan membantu penilaian tugas praktikum.",
    type: "work",
    order: 4,
  },
  {
    id: "bachelor-telkom",
    title: "Bachelor of Data Science",
    organization: "Telkom University",
    dateRange: "2021 – 2025",
    description: "GPA 3.96, Summa Cum Laude",
    type: "education",
    order: 5,
  },
];

export const skills: Skill[] = [
  // Existing Skills (order 1–9)
  { name: "Python", category: "existing", order: 1 },
  { name: "Pandas", category: "existing", order: 2 },
  { name: "NumPy", category: "existing", order: 3 },
  { name: "SQL", category: "existing", order: 4 },
  { name: "Tableau", category: "existing", order: 5 },
  { name: "Looker Studio", category: "existing", order: 6 },
  { name: "Power Query", category: "existing", order: 7 },
  { name: "Machine Learning", category: "existing", order: 8 },
  { name: "Data Visualization", category: "existing", order: 9 },
  // New Tech Stack (order 10–14)
  { name: "Next.js", category: "new", order: 10 },
  { name: "React", category: "new", order: 11 },
  { name: "TypeScript", category: "new", order: 12 },
  { name: "Tailwind CSS", category: "new", order: 13 },
  { name: "Framer Motion", category: "new", order: 14 },
];

// ─── Framer Motion Animation Variants ────────────────────────────────────────

/** Word-by-word text reveal for HeroSection headline */
export const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/** Scale + fade-in for ExperienceCard whileInView */
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/** Stagger container for SkillBridgeSection — staggerChildren in 80–120ms range */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }, // 100ms (within 80–120ms)
};

/** Fade + slide-up for individual SkillBadge */
export const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
