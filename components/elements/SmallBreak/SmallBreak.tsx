import { SIZES } from "@constants";
import React from "react";

/**
 * Renders 14px (1.025vw) of br
 */
export const SmallBreak = (): JSX.Element => {
  const height = SIZES.small;

  return <div style={{ height: height, width: 0 }} />;
};
