import React from "react";

import Props from "@types";

/**
 * Renders 40px (2.93vw) text and letter spacing of 0.8px
 */
export const HeadingText = ({ children }: Props.TextProps): JSX.Element => {
  return (
    <div className="text-heading font-heading tracking-default cursor-default">
      {children}
    </div>
  );
};