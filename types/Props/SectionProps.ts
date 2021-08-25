import { ReactNode, RefObject } from "react";

export interface SectionProps {
  children: ReactNode;
  title: string;
  sectionRef: RefObject<HTMLDivElement>;
}
