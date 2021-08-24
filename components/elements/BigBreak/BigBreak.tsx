import { SIZES } from "@constants";
import React from "react";

/**
 * Renders 30px (2.21vw) br
 */
export const BigBreak = (): JSX.Element => {
  const height = SIZES.big;

  return <div style={{ height: height, width: 0 }} />;
};
