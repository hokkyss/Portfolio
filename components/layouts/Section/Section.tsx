import { HeadingText } from "@components/elements";
import React from "react";

import styles from "./Section.module.css";

import Props from "@types";

export const Section = ({
  children,
  title,
  sectionRef,
}: Props.SectionProps) => {
  return (
    <>
      <div className="linebreak" />
      <HeadingText>
        <div id={title} className="section-heading" ref={sectionRef}>
          {title}
        </div>
      </HeadingText>
      <div className={styles.section}>{children}</div>
    </>
  );
};
