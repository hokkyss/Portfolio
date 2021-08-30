import React from "react";

import styles from "./ExperienceCard.module.css";

import Props, { Experience } from "@types";

export const ExperienceCard = ({ item }: Props.ExperienceCardProps) => {
  return (
    <div className="flex flex-row">
      <div className={`${styles.left}`}></div>
      <div></div>
    </div>
  );
};
