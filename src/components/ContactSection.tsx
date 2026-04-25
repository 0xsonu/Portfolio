import SectionWrapper from "./SectionWrapper";
import SocialLinks from "./SocialLinks";

interface ContactSectionProps {
  email: string;
  socials: Record<string, string>;
}

export default function ContactSection({
  email,
  socials,
}: ContactSectionProps) {
  return (
    <SectionWrapper id="contact" title="Contact">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-text-secondary font-sans text-lg">
          Want to get in touch? Drop me an email or find me on socials.
        </p>
        <a
          href={`mailto:${email}`}
          className="font-mono text-xl text-accent-cyan transition-all duration-300 hover:text-accent-purple hover:drop-shadow-[0_0_10px_rgba(180,74,255,0.4)]"
        >
          {email}
        </a>
        <SocialLinks socials={socials} className="text-lg" />
      </div>
    </SectionWrapper>
  );
}
