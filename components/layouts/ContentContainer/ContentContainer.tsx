import React, { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => (
  <div className="content w-content h-content absolute">{children}</div>
);
