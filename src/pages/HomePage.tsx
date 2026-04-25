import { profileData } from "../data/profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import SystemStatsSection from "../components/SystemStatsSection";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <EducationSection education={profileData.education} />
        <ExperienceSection experience={profileData.experience} />
        <SkillsSection skills={profileData.skills} />
        <SystemStatsSection systemStats={profileData.systemStats} />
        <ContactSection
          email={profileData.email}
          socials={profileData.socials}
        />
      </main>
      <Footer />
    </>
  );
}
