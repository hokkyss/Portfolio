/* eslint-disable @next/next/no-img-element */
import React from "react";

import Props from "@types";

export const CircleImage = ({
  src,
  className = "",
  alt = "",
}: Props.CircleImageProps): JSX.Element => {
  return (
    <img
      src={src}
      className={`circle ${className}`}
      alt={alt}
      style={{ objectFit: "cover" }}
    />
  );
};
