import type { ExperienceEntry } from "../data/profile";
import SectionWrapper from "./SectionWrapper";
import Timeline from "./Timeline";

interface ExperienceSectionProps {
  experience: ExperienceEntry[];
}

export default function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  if (experience.length === 0) {
    return null;
  }

  const timelineItems = experience.map((entry) => ({
    title: entry.role,
    subtitle: entry.company,
    period: entry.duration,
    details: entry.description,
    tags: entry.tech,
  }));

  return (
    <SectionWrapper id="experience" title="Experience">
      <Timeline items={timelineItems} />
    </SectionWrapper>
  );
}
