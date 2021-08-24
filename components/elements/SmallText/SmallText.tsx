import React, { ReactNode } from "react";

interface SmallTextProps {
  children: ReactNode;
}

/**
 * Renders 14px of text size
 */
export const SmallText = ({ children }: SmallTextProps): JSX.Element => {
  return <div className="text-small cursor-default">{children}</div>;
};
