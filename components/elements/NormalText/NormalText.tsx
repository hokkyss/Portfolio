import React, { ReactNode } from "react";

interface NormalTextProps {
  children: ReactNode;
}

export const NormalText = ({ children }: NormalTextProps): JSX.Element => {
  return <div className="text-normal cursor-default">{children}</div>;
};
