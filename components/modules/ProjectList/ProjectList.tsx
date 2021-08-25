import React from "react";

import styles from "./ProjectList.module.css";

import { ProjectCard } from "@components/elements";
import { projects } from "@constants";
import { Project } from "@types";

export const ProjectList = (): JSX.Element => {
  return (
    <div className={`flex flex-row flex-wrap ${styles.container}`}>
      {projects.map((project) => (
        <ProjectCard key={project.name} item={project} />
      ))}
    </div>
  );
};
