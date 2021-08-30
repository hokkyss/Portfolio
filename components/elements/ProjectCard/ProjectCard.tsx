/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import styles from "./ProjectCard.module.css";

import Props from "@types";
import { NormalText, TextIcon } from "@components/elements";

import ArrowRight from "@icons/arrow-right.svg";

export const ProjectCard = ({ item }: Props.ProjectCardProps): JSX.Element => {
  return (
    <div
      className={`flex flex-col cursor-pointer ${styles.card} items-center justify-center`}
    >
      <div className={`${styles.imageContainer}`}>
        <div
          style={{
            backgroundImage: `url(${item.preview})`,
          }}
          className={`absolute ${styles.preview} ${styles.hover}`}
        />
        <div className={`${styles.hoverContent}`}>
          <a href={item.links.page}>
            <TextIcon Icon={ArrowRight} text="See project" />
          </a>
        </div>
      </div>
    </div>
  );
};
