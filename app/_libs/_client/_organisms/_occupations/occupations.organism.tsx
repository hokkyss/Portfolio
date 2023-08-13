'use client';

import 'client-only';

import { useCallback, useState } from 'react';

import FadingText from '../../_atoms/_fading-text/fading-text.atom';
import useInterval from '../../_hooks/_use-interval/use-interval.hook';

interface OccupationProps {
  ms?: number;
  occupations: string[];
}

export default function Occupations(props: OccupationProps) {
  const { ms = 2000, occupations } = props;
  const [index, setIndex] = useState(0);

  useInterval(
    useCallback(() => {
      setIndex((prev) => (prev + 1) % occupations.length);
    }, [occupations.length]),
    ms,
  );

  return (
    <FadingText disabled={occupations.length === 1} ms={ms}>
      {occupations[index]}
    </FadingText>
  );
}
