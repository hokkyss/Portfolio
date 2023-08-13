'use client';

import 'client-only';

import { useEffect } from 'react';

export default function useTimeout(callback: () => void, ms: number) {
  useEffect(() => {
    const timeout = setTimeout(callback, ms);

    return () => clearTimeout(timeout);
  }, [callback, ms]);
}
