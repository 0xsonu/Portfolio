import { motion } from "motion/react";
import { Github, ExternalLink, Server, Smartphone } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title:
        "High-Throughput Event Simulation and Streaming Platform for 4G/5G Call Networks",
      description:
        "Simulated concurrent 4G/5G call sessions across 20+ virtual network nodes, streaming high-throughput, low-latency events using Python and Java",
      tags: ["Python", "Java", "Event Streaming", "4G/5G", "Simulation"],
      icon: Server,
      github: "https://github.com/0xsonu",
      demo: null,
      gradient: "from-primary to-accent",
    },
    {
      title: "Dappunk — Mobile Messaging & Payments Platform",
      description:
        "Full-stack mobile application built with React Native featuring 100+ dynamic screens, Stripe payment integration, Alchemy API for secure payments, real-time WebSocket updates, and 150+ REST API routes",
      tags: ["React Native", "Node.js", "Stripe", "WebSockets", "Redis", "AWS"],
      icon: Smartphone,
      github: null,
      demo: "https://www.figma.com/proto/YrpROSRUjdNAkAJOE5oed0/MVP-Messenger?node-id=86-2891&t=PffQNUBw5O2Wu4kd-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=86%3A2891&show-proto-sidebar=1",
      gradient: "from-secondary to-primary",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-accent to-neon-green bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            Production-grade systems built to solve real-world scalability
            challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
                        >
                          <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs rounded-full bg-muted border border-border text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/0xsonu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
