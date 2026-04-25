import type { Skills } from "../data/profile";
import SectionWrapper from "./SectionWrapper";

interface SkillsSectionProps {
  skills: Skills;
}

const accentStyles = [
  {
    heading: "text-accent-cyan",
    badge:
      "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10 shadow-glow-cyan",
  },
  {
    heading: "text-accent-purple",
    badge:
      "border-accent-purple/30 text-accent-purple bg-accent-purple/10 shadow-glow-purple",
  },
  {
    heading: "text-accent-green",
    badge:
      "border-accent-green/30 text-accent-green bg-accent-green/10 shadow-glow-green",
  },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Object.entries(skills);

  if (categories.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="skills" title="Skills">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([category, items], index) => {
          const accent = accentStyles[index % accentStyles.length];

          return (
            <div
              key={category}
              className="rounded-lg border border-bg-card bg-bg-secondary p-5 transition-all duration-300 hover:border-accent-cyan/20 hover:shadow-glow-cyan"
            >
              <h3
                className={`mb-4 font-mono text-lg font-semibold ${accent.heading}`}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full border px-3 py-1 font-mono text-xs ${accent.badge}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
