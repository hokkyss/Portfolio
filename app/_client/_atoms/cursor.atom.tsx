'use client';
import 'client-only';

import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react';
import { memo, useEffect, useMemo, useState } from 'react';

const Cursor = memo(() => {
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const referenceElement = useMemo(
    () => ({
      getBoundingClientRect: () => ({
        bottom: cursorPosition.y,
        height: 0,
        left: cursorPosition.x,
        right: cursorPosition.x,
        top: cursorPosition.y,
        width: 0,
        x: cursorPosition.x,
        y: cursorPosition.y,
      }),
    }),
    [cursorPosition.x, cursorPosition.y],
  );

  const { floatingStyles, refs } = useFloating({
    middleware: [
      offset((state) => ({
        crossAxis: 0,
        mainAxis: -state.elements.floating.clientWidth / 2,
      })),
      shift({
        crossAxis: true,
      }),
    ],
    strategy: 'absolute',
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    refs.setReference(referenceElement);
  }, [referenceElement, refs]);

  useEffect(() => {
    const handler = ({ clientX, clientY }: MouseEvent) => {
      setCursorPosition({
        x: clientX,
        y: clientY,
      });
    };
    document.body.addEventListener('mousemove', handler);

    return () => document.body.removeEventListener('mousemove', handler);
  }, []);

  return (
    <span
      className="bg-green-600 -z-[10] rounded-full blur-lg w-20 h-20"
      ref={refs.setFloating}
      style={floatingStyles}
    />
  );
});

export default Cursor;
