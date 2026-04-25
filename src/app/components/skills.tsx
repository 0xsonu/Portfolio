import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  Rabbit,
  Flame,
  FileCode,
  Braces,
  Database,
  Leaf,
  Network,
  Gem,
  Globe,
  Component,
  Box,
  Ship,
  GitBranch,
  Terminal as TerminalIcon,
  RefreshCw,
  Anchor,
  Cloud,
  SquareTerminal,
  Wrench,
  BarChart3,
  Activity,
  MessageSquare,
  Zap,
  Layers,
  Brain,
  FileSearch,
  Binary,
  Users,
} from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
  color: string;
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", icon: Coffee },
        { name: "Go", icon: Rabbit },
        { name: "Rust", icon: Flame },
        { name: "Python", icon: FileCode },
        { name: "JavaScript/TypeScript", icon: Braces },
        { name: "SQL/NoSQL", icon: Database },
      ],
      color: "primary",
    },
    {
      category: "Frameworks & Principles",
      skills: [
        { name: "Spring", icon: Leaf },
        { name: "Distributed Systems", icon: Network },
        { name: "OOP & SOLID", icon: Gem },
        { name: "Node.js", icon: Globe },
        { name: "React", icon: Component },
      ],
      color: "secondary",
    },
    {
      category: "Tools & Infrastructure",
      skills: [
        { name: "Docker", icon: Box },
        { name: "Kubernetes", icon: Ship },
        { name: "Git", icon: GitBranch },
        { name: "Linux", icon: TerminalIcon },
        { name: "CI/CD", icon: RefreshCw },
        { name: "Helm", icon: Anchor },
        { name: "AWS", icon: Cloud },
        { name: "Bash", icon: SquareTerminal },
        { name: "Jenkins", icon: Wrench },
        { name: "Grafana", icon: BarChart3 },
        { name: "Prometheus", icon: Activity },
      ],
      color: "accent",
    },
    {
      category: "Databases & Messaging",
      skills: [
        { name: "Kafka", icon: MessageSquare },
        { name: "Redis", icon: Zap },
        { name: "MongoDB", icon: Layers },
        { name: "SQL Databases", icon: Database },
      ],
      color: "neon-green",
    },
  ];

  const additionalTags = [
    { name: "Data Structures & Algorithms", icon: Brain },
    { name: "Gerrit", icon: FileSearch },
    { name: "Protobuf", icon: Binary },
    { name: "ASN.1", icon: Binary },
    { name: "Agile", icon: Users },
  ];

  const glowColors: Record<string, string> = {
    primary: "rgba(0,240,255,0.4)",
    secondary: "rgba(168,85,247,0.4)",
    accent: "rgba(34,211,238,0.4)",
    "neon-green": "rgba(16,185,129,0.4)",
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Technical Stack
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies I work with daily to build production-grade systems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="mb-5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-${category.color}`} />
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 16px ${glowColors[category.color]}, 0 0 32px ${glowColors[category.color]}`,
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-${category.color}/10 border border-${category.color}/30 text-foreground hover:border-${category.color} transition-all duration-300 cursor-default`}
                    >
                      <Icon className={`w-3.5 h-3.5 text-${category.color}`} />
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            {additionalTags.map((tag, index) => {
              const Icon = tag.icon;
              return (
                <motion.span
                  key={index}
                  whileHover={{
                    scale: 1.1,
                    boxShadow:
                      "0 0 16px rgba(0,240,255,0.3), 0 0 32px rgba(0,240,255,0.15)",
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-muted border border-primary/20 text-foreground hover:border-primary transition-all duration-300 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {tag.name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
