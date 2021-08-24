import { BigText } from "@components/elements";
import React, { ReactNode, MouseEventHandler } from "react";

import styles from "./Subsection.module.css";

interface SubsectionProps {
  children: ReactNode;
  title: string;
}

export const Subsection = ({
  children,
  title,
}: SubsectionProps): JSX.Element => {
  return (
    <div>
      <BigText>
        <div className={styles.subsection}>{title}</div>
      </BigText>
      <div>{children}</div>
    </div>
  );
};
