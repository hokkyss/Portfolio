'use client';

import 'client-only';

import { autoUpdate, offset, shift, useClientPoint, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { memo } from 'react';

import { tw } from '~/_common/utils/classname.util';

const Cursor = memo(() => {
  const { context, floatingStyles, refs } = useFloating({
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

  const clientPoint = useClientPoint(context, { axis: 'both' });
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([clientPoint, role]);

  return (
    <span
      className={tw`-z-[10] hidden h-40 w-40 rounded-full bg-slate-600 blur-2xl dark:bg-yellow-400 md:inline`}
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    />
  );
});

export default Cursor;
