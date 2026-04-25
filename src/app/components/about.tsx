import { motion } from "motion/react";
import {
  Server,
  Cloud,
  Database,
  Code2,
  Zap,
  Shield,
  Cpu,
  Globe,
  Briefcase,
  Smartphone,
  Heart,
} from "lucide-react";

export function About() {
  const features = [
    {
      icon: Server,
      title: "Microservices Architecture",
      description:
        "Building production-grade streaming microservices in Java and Go with sub-millisecond latency. Designed and deployed 6 independent services handling real-time telecom event processing at scale.",
    },
    {
      icon: Cloud,
      title: "Event Streaming",
      description:
        "High-throughput event streaming with binary encodings (Protobuf, ASN.1), achieving 96M events/sec. Experience with Kafka pipelines, Redis pub/sub, and WebSocket-based real-time data delivery.",
    },
    {
      icon: Database,
      title: "System Design & Optimization",
      description:
        "Latency optimization through zerocopy processing, batching, and backpressure techniques. Profiling and tuning JVM and Go runtimes for maximum throughput under production workloads.",
    },
    {
      icon: Code2,
      title: "Cloud-Native Infrastructure",
      description:
        "Kubernetes-based deployments with Docker, Helm, and automated provisioning. Implemented RBAC, namespace isolation, encrypted secrets, and CI/CD pipelines for secure, repeatable releases.",
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description:
        "Platform-level security using Kubernetes RBAC, namespace isolation, and encrypted secrets management. Designed infrastructure achieving 99.9% uptime with comprehensive monitoring via Grafana and Prometheus.",
    },
    {
      icon: Globe,
      title: "Full-Stack & Mobile",
      description:
        "Built mobile applications with React Native featuring 100+ dynamic screens, Stripe payment integration, and real-time WebSocket updates. Comfortable across the entire stack from APIs to UI.",
    },
  ];

  const highlights = [
    { value: "96M", label: "Events/sec", icon: Zap },
    { value: "6", label: "Production Microservices", icon: Server },
    { value: "$70M+", label: "Hardware Replaced", icon: Cpu },
    { value: "99.9%", label: "Uptime Achieved", icon: Shield },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Software developer with 2+ years of experience building
            high-throughput microservices, event streaming platforms, and
            cloud-native systems. I specialize in system design, latency
            optimization, and Kubernetes-based infrastructure.
          </p>
        </motion.div>

        {/* Highlight stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-lg bg-card border border-border"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Journey section */}
        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          {[
            {
              icon: Briefcase,
              color: "primary",
              title: "Currently @ TCS × Ericsson",
              text: "Based in Thane, Mumbai — building streaming microservices that process millions of events per second for 4G/5G network simulation. This work has replaced over $70M in physical test hardware with software-defined solutions.",
            },
            {
              icon: Smartphone,
              color: "secondary",
              title: "Previously @ Dappunk",
              text: "Built a full-stack mobile platform from the ground up — React Native frontend with 100+ screens, 150+ REST API routes, Stripe payments, and real-time WebSocket features, all running on Kubernetes and AWS infrastructure.",
            },
            {
              icon: Heart,
              color: "accent",
              title: "What Drives Me",
              text: "I care about writing clean, maintainable code and building systems that are observable, testable, and resilient. When I'm not coding, I enjoy exploring new technologies, contributing to open source, and writing about distributed systems and performance engineering.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex items-start gap-4 p-6 rounded-lg bg-card border-l-4 border-${item.color} border-r border-t border-b border-r-border border-t-border border-b-border hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300`}
              >
                <div
                  className={`p-3 rounded-lg bg-${item.color}/10 flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
