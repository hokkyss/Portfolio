/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CircleImageProps {
  src: string;
  className?: string;
  alt?: string;
}

export const CircleImage = ({
  src,
  className = "",
  alt = "",
}: CircleImageProps): JSX.Element => {
  return (
    <img
      src={src}
      className={`circle ${className}`}
      alt={alt}
      style={{ objectFit: "cover" }}
    />
  );
};
