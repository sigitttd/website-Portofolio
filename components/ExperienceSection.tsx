import { experiences } from "@/lib/data";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceSection() {
  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sorted.map((exp) => (
          <ExperienceCard
            key={exp.id}
            title={exp.title}
            organization={exp.organization}
            dateRange={exp.dateRange}
            description={exp.description}
            type={exp.type}
          />
        ))}
      </div>
    </section>
  );
}
