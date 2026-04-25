import { profileData } from "../data/profile";
import SocialLinks from "./SocialLinks";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Terminal prompt line */}
        <p className="mb-4 font-mono text-sm text-accent-green">
          <span className="text-text-secondary">visitor@portfolio</span>
          <span className="text-accent-cyan">:</span>
          <span className="text-accent-purple">~</span>
          <span className="text-text-secondary">$</span>{" "}
          <span className="text-text-primary">cat intro.txt</span>
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent-cyan align-middle" />
        </p>

        {/* Name */}
        <h1 className="mb-3 font-mono text-4xl font-bold tracking-tight text-accent-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] sm:text-5xl md:text-6xl">
          {profileData.name}
        </h1>

        {/* Title */}
        <p className="mb-4 font-mono text-lg text-text-primary sm:text-xl md:text-2xl">
          {profileData.title}
        </p>

        {/* Tagline */}
        <p className="mb-8 text-base text-text-secondary sm:text-lg">
          {profileData.tagline}
        </p>

        {/* Social links */}
        <SocialLinks socials={profileData.socials} className="justify-center" />
      </div>
    </section>
  );
}
