import type { SystemStats } from "../data/profile";
import SectionWrapper from "./SectionWrapper";

interface SystemStatsSectionProps {
  systemStats: SystemStats;
}

export default function SystemStatsSection({
  systemStats,
}: SystemStatsSectionProps) {
  const { currentFocus, currentlyLearning, githubUsername } = systemStats;

  return (
    <SectionWrapper id="system-stats" title="System Stats">
      <div className="rounded-lg border border-bg-card bg-bg-secondary p-6 font-mono text-sm transition-all duration-300 hover:border-accent-green/20 hover:shadow-glow-green">
        {/* Terminal header bar */}
        <div className="mb-6 flex items-center gap-2 border-b border-bg-card pb-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-accent-green" />
          <span className="ml-3 text-text-secondary">~/system-stats</span>
        </div>

        {/* Current Focus */}
        <div className="mb-6">
          <p className="mb-3 text-accent-cyan">
            <span className="text-accent-green">$</span> cat current_focus.log
          </p>
          <ul className="space-y-2 pl-4">
            {currentFocus.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-accent-cyan"
              >
                <span className="mt-0.5 text-text-secondary">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Currently Learning */}
        <div className="mb-6">
          <p className="mb-3 text-accent-green">
            <span className="text-accent-green">$</span> tail -f learning.log
          </p>
          <ul className="space-y-2 pl-4">
            {currentlyLearning.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-accent-green"
              >
                <span className="mt-0.5 text-text-secondary">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub Activity — conditional on githubUsername */}
        {githubUsername && (
          <div>
            <p className="mb-4 text-accent-purple">
              <span className="text-accent-green">$</span> gh activity --user{" "}
              {githubUsername}
            </p>

            <div className="space-y-4">
              {/* Row 1: Stats + Streak side by side */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* GitHub Stats Card */}
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-bg-card transition-all duration-300 hover:border-accent-purple/30 hover:shadow-glow-purple"
                >
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=0a0a0f&title_color=00f0ff&text_color=a0a0b0&icon_color=b44aff&ring_color=00f0ff`}
                    alt={`${githubUsername}'s GitHub stats`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </a>

                {/* GitHub Streak Stats */}
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-bg-card transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-glow-cyan"
                >
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&background=0a0a0f&ring=00f0ff&fire=00ff88&currStreakLabel=00f0ff&sideLabels=a0a0b0&currStreakNum=e0e0e0&sideNums=e0e0e0&dates=a0a0b0&stroke=1a1a2e&hide_border=true`}
                    alt={`${githubUsername}'s GitHub streak`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Row 2: Contribution Graph full width */}
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-bg-card transition-all duration-300 hover:border-accent-green/30 hover:shadow-glow-green"
              >
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&bg_color=0a0a0f&color=00f0ff&line=b44aff&point=00ff88&area=true&area_color=b44aff&hide_border=true`}
                  alt={`${githubUsername}'s contribution graph`}
                  className="w-full"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
