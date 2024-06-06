"use client";

import { projects } from "@/data";
import { Projects } from "./ui/Projects";

const RecentProjects = () => {
  return (
    <section id="projects" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <Projects projects={projects} />
    </section>
  );
};

export default RecentProjects;
