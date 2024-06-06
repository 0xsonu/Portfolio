"use client";

import { projects } from "@/data";
import { Projects } from "./ui/Projects";

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <Projects projects={projects} />
    </div>
  );
};

export default RecentProjects;
