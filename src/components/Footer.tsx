import { profileData } from "../data/profile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-secondary py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <SocialLinks socials={profileData.socials} />

        {profileData.tagline && (
          <p className="font-mono text-sm text-text-secondary">
            {profileData.tagline}
          </p>
        )}

        <p className="text-sm text-text-secondary">
          &copy; {currentYear} {profileData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
