declare module '*.svg?react' {
  import type { FC, RefAttributes, SVGProps } from 'react';

  const SVGComponent: FC<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>;

  export default SVGComponent;
}
