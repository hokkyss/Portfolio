import React, { ReactNode } from "react";

interface NormalTextProps {
  children: ReactNode;
}

/**
 * Renders 20px (1.46vw) text
 */
export const NormalText = ({ children }: NormalTextProps): JSX.Element => {
  return <div className="text-normal cursor-default">{children}</div>;
};
