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
      <div className="linebreak" ref={sectionRef} />
      <HeadingText>
        <div id={title} className="section-heading">
          {title}
        </div>
      </HeadingText>
      <div className={styles.section}>{children}</div>
    </>
  );
};
