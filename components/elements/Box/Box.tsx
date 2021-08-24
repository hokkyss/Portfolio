import React, { ReactNode } from "react";

import styles from "./Box.module.css";

interface BoxProps {
  children: ReactNode;
}

export const Box = ({ children }: BoxProps): JSX.Element => {
  return (
    <div className={`flex flex-row flex-wrap ${styles.box}`}>{children}</div>
  );
};
