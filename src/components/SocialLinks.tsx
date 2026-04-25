import type { ComponentType } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiHashnode, SiDevdotto } from "react-icons/si";

interface SocialLinksProps {
  socials: Record<string, string>; // platform → URL
  className?: string;
}

type IconComponent = ComponentType<{ className?: string }>;

const PLATFORM_ICONS: Record<string, IconComponent> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  hashnode: SiHashnode,
  devto: SiDevdotto,
};

export default function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {Object.entries(socials).map(([platform, url]) => {
        const Icon = PLATFORM_ICONS[platform.toLowerCase()];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="text-text-secondary hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 ease-out hover:scale-110 inline-flex"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
