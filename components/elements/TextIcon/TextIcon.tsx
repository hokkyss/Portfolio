import React from "react";

import styles from "./TextIcon.module.css";

import { NormalText } from "@components/elements";
import { SIZES } from "@constants";
import Props from "@types";

export const TextIcon = ({ Icon, text }: Props.IconTextProps): JSX.Element => {
  const size = SIZES.normal;
  return (
    <div
      className={`flex flex-row justify-center items-center ${styles.container}`}
    >
      <NormalText>
        <div className={styles.text}>{text}</div>
      </NormalText>
      <Icon width={size} height={size} />
    </div>
  );
};
