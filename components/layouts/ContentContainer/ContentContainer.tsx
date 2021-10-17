import React from "react";

import Props from "@types";

export const ContentContainer = ({ children }: Props.ContentContainerProps) => (
  <div className="content w-content">{children}</div>
);