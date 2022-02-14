import React from "react";

import styles from "./Footer.module.css";

import { NormalText } from "@components/elements";

export const Footer = () => {
  return (
    <div
      className={`flex flex-row justify-center items-center ${styles.footer}`}
    >
      <NormalText>
        &copy;{" "}
        <a href="mailto:hokkyss2@gmail.com" target="_blank" rel="noreferrer">
          Hokki Suwanda
        </a>
      </NormalText>
    </div>
  );
};
