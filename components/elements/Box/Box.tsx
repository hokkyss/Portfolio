import React from "react";

import styles from "./Box.module.css";

import Props from "@types";

export const Box = ({ children }: Props.BoxProps): JSX.Element => {
  return (
    <div className={`flex flex-row flex-wrap ${styles.box}`}>{children}</div>
  );
};
