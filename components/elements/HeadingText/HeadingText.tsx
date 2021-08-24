import React, { ReactNode } from "react";

interface HeadingTextProps {
  children: ReactNode;
}

/**
 * Renders 40px text and letter spacing of 0.8px
 */
export const HeadingText = ({ children }: HeadingTextProps): JSX.Element => {
  return (
    <div className="text-heading font-heading tracking-default cursor-default">
      {children}
    </div>
  );
};
