import { SIZES } from "@constants";
import React from "react";

/**
 * Renders 20px (1.46vw) of br
 */
export const NormalBreak = (): JSX.Element => {
  const height = SIZES.normal;

  return <div style={{ height: height, width: 0 }} />;
};
