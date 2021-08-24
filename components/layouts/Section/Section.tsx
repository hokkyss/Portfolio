import { HeadingText } from "@components/elements";
import React, { ReactNode, RefObject } from "react";

import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  title: string;
  sectionRef: RefObject<HTMLDivElement>;
}

export const Section = ({ children, title, sectionRef }: SectionProps) => {
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
