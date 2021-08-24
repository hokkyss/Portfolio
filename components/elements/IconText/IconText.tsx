import React, { FunctionComponent, SVGAttributes } from "react";

import "tailwindcss/tailwind.css";
import styles from "./IconText.module.css";

import { NormalText } from "@components/elements";
import { SIZES } from "@constants";

interface IconTextProps {
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  text: string;
}

export const IconText = ({ Icon, text }: IconTextProps): JSX.Element => {
  const size = SIZES.normal;
  console.log(Icon);
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
