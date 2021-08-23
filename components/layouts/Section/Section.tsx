import React, { ReactNode, RefObject } from "react";

interface SectionProps {
  children: ReactNode;
  title: string;
  sectionRef: RefObject<HTMLDivElement>;
}

export const Section = ({ children, title, sectionRef }: SectionProps) => {
  return (
    <>
      <div className="linebreak" />
      <div id={title} className="section-heading text-heading" ref={sectionRef}>
        {title}
      </div>
      {children}
    </>
  );
};
