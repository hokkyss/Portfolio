declare module '*.svg?url' {
  const url: string;

  export default url;
}

declare module '*.svg' {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

  const SVGComponent: ForwardRefExoticComponent<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>;

  export default SVGComponent;
}
