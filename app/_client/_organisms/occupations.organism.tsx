'use client';

import 'client-only';

import type { CSSProperties } from 'react';

import { forwardRef, useCallback, useState } from 'react';

import FadingText from '../_atoms/fading-text.atom';
import useInterval from '../_hooks/use-interval.hook';

interface OccupationProps {
  className?: string;
  delay?: number;
  ms?: number;
  occupations: string[];
  style?: CSSProperties;
}

const Occupations = forwardRef<HTMLElement, OccupationProps>((props, ref) => {
  const { delay = 200, ms = 2000, occupations } = props;
  const [index, setIndex] = useState(0);

  useInterval(
    useCallback(() => {
      setIndex((prev) => (prev + 1) % occupations.length);
    }, [occupations.length]),
    ms,
  );

  return (
    <FadingText delay={delay} disabled={occupations.length === 1} key={occupations[index]} ms={ms} ref={ref}>
      {occupations[index]}
    </FadingText>
  );
});

export default Occupations;
