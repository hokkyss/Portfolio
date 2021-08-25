import React from "react";

import styles from "./IconText.module.css";

import { NormalText } from "@components/elements";
import { SIZES } from "@constants";
import Props from "@types";

export const IconText = ({ Icon, text }: Props.IconTextProps): JSX.Element => {
  const size = SIZES.normal;
  return (
    <div
      className={`flex flex-row justify-center items-center ${styles.container}`}
    >
      <Icon width={size} height={size} />
      <NormalText>
        <div className={styles.text}>{text}</div>
      </NormalText>
    </div>
  );
};
