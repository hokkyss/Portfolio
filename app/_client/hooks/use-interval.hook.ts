'use client';

import 'client-only';

import { useEffect } from 'react';

export default function useInterval(callback: () => void, ms: number) {
  useEffect(() => {
    const interval = setInterval(callback, ms);

    return () => clearInterval(interval);
  }, [callback, ms]);
}
