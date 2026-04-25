import type { EducationEntry } from "../data/profile";
import SectionWrapper from "./SectionWrapper";
import Timeline from "./Timeline";

interface EducationSectionProps {
  education: EducationEntry[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) {
    return null;
  }

  const timelineItems = education.map((entry) => ({
    title: entry.degree,
    subtitle: entry.institution,
    period: entry.year,
    details: entry.details,
  }));

  return (
    <SectionWrapper id="education" title="Education">
      <Timeline items={timelineItems} />
    </SectionWrapper>
  );
}
