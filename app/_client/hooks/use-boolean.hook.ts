'use client';

import 'client-only';

import { useCallback, useMemo, useState } from 'react';

export type UseBooleanResult = [
  boolean,
  {
    toggle: () => void;
    turnOff: () => void;
    turnOn: () => void;
  },
];

export default function useBoolean(initialValue = false): UseBooleanResult {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const turnOn = useCallback(() => setIsOpen(true), []);

  const turnOff = useCallback(() => setIsOpen(false), []);

  return useMemo(() => [isOpen, { toggle, turnOff, turnOn }], [turnOff, isOpen, turnOn, toggle]);
}
