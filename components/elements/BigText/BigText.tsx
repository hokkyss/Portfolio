import React from "react";

import Props from "@types";

/**
 * Renders a 30px (2.21vw) text
 */
export const BigText = ({ children }: Props.TextProps): JSX.Element => {
  return <div className="text-big cursor-default">{children}</div>;
};
