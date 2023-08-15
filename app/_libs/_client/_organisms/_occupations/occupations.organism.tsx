'use client';

import 'client-only';

import { useCallback, useState } from 'react';

import FadingText from '../../_atoms/_fading-text/fading-text.atom';
import useInterval from '../../_hooks/_use-interval/use-interval.hook';

interface OccupationProps {
  delay?: number;
  ms?: number;
  occupations: string[];
}

export default function Occupations(props: OccupationProps) {
  const { delay = 200, ms = 2000, occupations } = props;
  const [index, setIndex] = useState(0);

  useInterval(
    useCallback(() => {
      setIndex((prev) => (prev + 1) % occupations.length);
    }, [occupations.length]),
    ms,
  );

  return (
    <FadingText delay={delay} disabled={occupations.length === 1} key={occupations[index]} ms={ms}>
      {occupations[index]}
    </FadingText>
  );
}
