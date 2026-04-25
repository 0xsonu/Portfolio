import { useState, useEffect } from "react";
import { Terminal, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText =
    "Building scalable microservices and high-throughput streaming platforms.";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-primary/20 mb-8"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Software Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <span className="block text-5xl md:text-7xl mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Sonu Kumar
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 min-h-8"
          >
            <p className="text-base md:text-2xl text-muted-foreground font-mono">
              {text}
              <span
                className={`inline-block w-0.5 h-6 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Read Blog
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="https://github.com/0xsonu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://linkedin.com/in/0xsonu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5 text-primary" />
            </a>
            <a
              href="mailto:sonu.patna0808@gmail.com"
              className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://leetcode.com/u/0xsonu/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Code2 className="w-5 h-5 text-primary" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-xs text-muted-foreground">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
