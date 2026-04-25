import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      company:
        "Tata Consultancy Services — Software Developer | Ericsson, Mumbai",
      position: "Software Developer",
      period: "Jan 2024 - Present",
      description:
        "Building high-throughput streaming microservices and event simulation platforms for telecom networks",
      achievements: [
        "Developed 6 production-grade streaming microservices in Java and Go with sub-millisecond latency",
        "Achieved peak throughput of 96M events/sec using binary encodings (Protobuf, ASN.1), zerocopy processing, batching, and backpressure",
        "Built real-time orchestration platform for dynamic stream control",
        "Created performance-critical internal tools in Rust",
        "Designed secure pipelines with Kafka and Redis",
        "Secured sensitive configurations using encrypted Kubernetes secrets",
        "Implemented platform-level security using Kubernetes RBAC, namespace isolation",
        "Automated provisioning with Python and Bash",
        "Enabled simulation of 100,000+ telecom nodes, replacing $70M+ in physical test hardware",
      ],
    },
    {
      company: "Dappunk — Backend Developer, Remote",
      position: "Backend Developer",
      period: "June 2023 - Dec 2023",
      description:
        "Developing and maintaining full-stack services, mobile applications, and cloud infrastructure",
      achievements: [
        "Designed and implemented robust application architectures using React Native, ensuring optimal performance, scalability, and maintainability",
        "Developed 100+ dynamic screens, enhancing user experience and interface responsiveness",
        "Integrated Stripe Payment Gateway for seamless transactions and Alchemy API for secure payment solutions",
        "Built and maintained 150+ REST API routes, enabling efficient communication between frontend and backend systems",
        "Implemented WebSockets for real-time data updates and leveraged Redis for efficient caching and data storage",
        "Designed and deployed scalable infrastructure, ensuring reliability and performance under varying workloads",
        "Configured and monitored cloud-native services using AWS (EKS, CloudWatch, RDS), 99.9% uptime",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,240,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            Building production systems and solving complex engineering
            challenges
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="md:ml-20">
                  <div className="absolute left-8 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_rgba(0,240,255,0.5)] hidden md:block -translate-x-[9px]" />

                  <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="mb-1">{exp.position}</h3>
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
