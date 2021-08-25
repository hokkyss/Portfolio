import { BigText } from "@components/elements";
import React from "react";

import styles from "./Subsection.module.css";

import Props from "@types";

export const Subsection = ({
  children,
  title,
}: Props.SubsectionProps): JSX.Element => {
  return (
    <div>
      <BigText>
        <div className={styles.subsection}>{title}</div>
      </BigText>
      <div>{children}</div>
    </div>
  );
};
