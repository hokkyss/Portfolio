import React from "react";

import Props from "@types";

/**
 * Renders 20px (1.46vw) text
 */
export const NormalText = ({ children }: Props.TextProps): JSX.Element => {
  return <div className="text-normal cursor-default">{children}</div>;
};
