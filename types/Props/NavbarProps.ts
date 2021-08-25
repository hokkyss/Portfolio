import { RefObject } from "react";

export interface NavbarProps {
  aboutRef: RefObject<HTMLDivElement>;
  projectRef: RefObject<HTMLDivElement>;
  expRef: RefObject<HTMLDivElement>;
  interestRef: RefObject<HTMLDivElement>;
}
