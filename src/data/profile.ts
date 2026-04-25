export interface SocialLinks {
  [platform: string]: string; // platform name → URL
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  description: string[]; // bullet points
  tech: string[]; // tech stack badges
}

export interface SystemStats {
  currentFocus: string[];
  currentlyLearning: string[];
  githubUsername?: string; // optional GitHub activity
}

export type Skills = Record<string, string[]>;

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  socials: SocialLinks;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Skills; // category → skill names
  systemStats: SystemStats;
}

export const profileData: ProfileData = {
  name: "Sonu Kumar",
  title: "Software Developer",
  tagline:
    "Building and scaling microservices, high-throughput event streaming platforms, and cloud-native infrastructure.",
  location: "Thane, Mumbai",
  email: "sonu.patna0808@gmail.com",

  socials: {
    github: "https://github.com/0xsonu",
    linkedin: "https://linkedin.com/in/0xsonu",
  },

  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Guru Ghasidas University, Bilaspur",
      year: "2019 - 2023",
      details: "CGPA: 8.2 | AICTE",
    },
    {
      degree: "Senior Secondary",
      institution: "JNV Bikram, Patna",
      year: "2017",
      details: "CBSE | 82%",
    },
    {
      degree: "Matriculation",
      institution: "JNV Bikram, Patna",
      year: "2015",
      details: "CBSE | CGPA: 10",
    },
  ],

  experience: [
    {
      role: "Software Developer",
      company: "Tata Consultancy Services | Ericsson",
      duration: "Jan 2024 - Present",
      description: [
        "Developed 6 production-grade streaming microservices in Java and Go with sub-millisecond latency using optimized memory layouts, constant-time serialization, and CPU-efficient pipelines",
        "Achieved peak throughput of 96M events/sec in benchmark environments using binary encodings (Protobuf, ASN.1), zero-copy processing, batching, and backpressure",
        "Built a real-time orchestration platform for dynamic stream control (start/stop, EPS throttling, pattern switching) and secure operator commands, reducing redeployments and improving test flexibility",
        "Created performance-critical internal tools in Rust, removing bottlenecks and reducing CPU usage in core hot paths with memory-safe execution and zero GC stalls",
        "Designed secure pipelines with Kafka for durable event processing and Redis for low-latency caching, integrating authN/authZ, client ACLs, and restricted topic operations",
        "Secured sensitive configurations using encrypted Kubernetes secrets and controlled distribution policies, preventing credential leaks across environments",
        "Implemented platform-level security using Kubernetes RBAC, namespace isolation, and least-privilege service accounts to protect production streaming workloads",
        "Automated provisioning and environment setup with Python and Bash, enabling reproducible deployments, secure access policies, and audit-ready CI/CD",
        "Enabled simulation of 100,000+ telecom nodes, replacing $70M+ in physical test hardware and significantly reducing annual validation costs",
      ],
      tech: [
        "Java",
        "Go",
        "Rust",
        "Kafka",
        "Redis",
        "Kubernetes",
        "Docker",
        "Protobuf",
        "Python",
        "Bash",
      ],
    },
    {
      role: "Backend Developer",
      company: "Dappunk",
      duration: "Jun 2023 - Dec 2023",
      description: [
        "Built and maintained 150+ REST API endpoints, ensuring reliable and efficient communication between frontend and backend systems",
        "Designed and deployed scalable infrastructure with Kubernetes, Docker, and AWS, delivering high availability and performance under variable workloads",
        "Configured and monitored cloud-native services using AWS (EKS, CloudWatch, RDS), improving observability and maintaining 99.9% production uptime",
      ],
      tech: ["Kubernetes", "Docker", "AWS", "EKS", "CloudWatch", "RDS"],
    },
  ],

  skills: {
    "Programming Languages": [
      "Java",
      "Go",
      "Rust",
      "Python",
      "JavaScript/TypeScript",
      "SQL",
      "NoSQL",
    ],
    Frameworks: [
      "Spring",
      "Distributed Systems",
      "React",
      "Node.js",
      "OOP",
      "SOLID",
    ],
    "Tools & Technology": [
      "DSA",
      "Git",
      "Gerrit",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Helm",
      "MongoDB",
      "Redis",
      "AWS",
      "Linux",
      "Bash",
      "Grafana",
      "Prometheus",
      "CI/CD",
    ],
  },

  systemStats: {
    currentFocus: [
      "High-throughput event streaming",
      "System design & latency optimization",
      "Cloud-native Kubernetes workloads",
    ],
    currentlyLearning: ["eBPF", "Advanced Rust async", "Platform engineering"],
    githubUsername: "0xsonu",
  },
};
