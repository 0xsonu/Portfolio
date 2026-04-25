interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  details: string | string[];
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

/** Backend/infrastructure tech keywords that get distinct accent styling */
const BACKEND_INFRA_KEYWORDS = new Set([
  "kubernetes",
  "docker",
  "terraform",
  "ansible",
  "helm",
  "aws",
  "gcp",
  "azure",
  "cloudflare",
  "jenkins",
  "argocd",
  "prometheus",
  "grafana",
  "datadog",
  "elk stack",
  "pagerduty",
  "aws ecs",
  "gitlab ci",
  "node.js",
  "rust",
  "go",
  "kafka",
  "postgresql",
  "nginx",
  "redis",
  "linux",
  "vault",
  "consul",
  "istio",
  "envoy",
  "nix",
  "ebpf",
]);

function getBadgeClasses(tag: string): string {
  const base =
    "inline-block rounded-full px-3 py-1 text-xs font-mono font-medium transition-colors";
  if (BACKEND_INFRA_KEYWORDS.has(tag.toLowerCase())) {
    return `${base} bg-accent-purple/15 text-accent-purple border border-accent-purple/30`;
  }
  return `${base} bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30`;
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-accent-cyan/20 sm:left-4" />

      <div className="space-y-10">
        {items.map((item, index) => (
          <div key={index} className="relative pl-10 sm:pl-12">
            {/* Dot marker */}
            <div className="absolute left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent-cyan bg-bg-primary shadow-glow-cyan sm:left-2.5 sm:h-3 sm:w-3" />

            {/* Card */}
            <div className="rounded-lg border border-white/5 bg-bg-card p-5 transition-all duration-300 hover:border-accent-cyan/20 hover:shadow-glow-cyan">
              {/* Period */}
              <span className="mb-1 inline-block font-mono text-xs text-accent-green">
                {item.period}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-text-primary">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-0.5 text-sm text-text-secondary">
                {item.subtitle}
              </p>

              {/* Details */}
              <div className="mt-3">
                {typeof item.details === "string" ? (
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.details}
                  </p>
                ) : (
                  <ul className="list-disc space-y-1 pl-4">
                    {item.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-text-secondary"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className={getBadgeClasses(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
