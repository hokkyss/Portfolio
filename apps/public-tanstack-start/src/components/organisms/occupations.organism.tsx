import type { CSSProperties } from 'react';

import { useEffect, useState } from 'react';

import FadingText from '../atoms/fading-text.atom';

interface OccupationProps {
  className?: string;
  delay?: number;
  ms?: number;
  occupations: string[];
  style?: CSSProperties;
}

const Occupations = ({ ref, ...props }: { ref?: React.RefObject<HTMLElement | null> } & OccupationProps) => {
  const { delay = 200, ms = 2000, occupations } = props;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % occupations.length);
    }, ms);

    return () => clearInterval(interval);
  }, [ms, occupations.length]);

  return (
    <FadingText delay={delay} disabled={occupations.length === 1} key={occupations[index]} ms={ms} ref={ref}>
      {occupations[index]}
    </FadingText>
  );
};

Occupations.displayName = 'Occupations';

export default Occupations;
