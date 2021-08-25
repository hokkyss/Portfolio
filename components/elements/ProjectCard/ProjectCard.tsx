import React from "react";

import styles from "./ProjectCard.module.css";

import Props from "@types";

export const ProjectCard = ({ item }: Props.ProjectCardProps): JSX.Element => {
  return (
    <div className={`flex cursor-pointer ${styles.card}`}>
      <div>{item.name}</div>
      <div></div>
    </div>
  );
};
