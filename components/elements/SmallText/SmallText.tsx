import React from "react";

import Props from "@types";

/**
 * Renders 14px (1.025vw) of text size
 */
export const SmallText = ({ children }: Props.TextProps): JSX.Element => {
  return <div className="text-small cursor-default">{children}</div>;
};
