import { FunctionComponent, SVGAttributes } from "react";

export interface IconTextProps {
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  text: string;
}
