import React, { ReactNode } from "react";

interface BigTextProps {
  children: ReactNode;
}

/**
 * Renders a 30px (2.21vw) text
 */
export const BigText = ({ children }: BigTextProps): JSX.Element => {
  return <div className="text-big cursor-default">{children}</div>;
};
