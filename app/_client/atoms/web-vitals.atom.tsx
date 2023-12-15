'use client';

import 'client-only';

import { useReportWebVitals } from 'next/web-vitals';
import { memo } from 'react';

import envConfig from '~/_common/configs/env.config';

const WebVitals = memo(() => {
  useReportWebVitals((metric) => {
    if (envConfig.__DEV__) {
      // NOTE: console is only on development
      // eslint-disable-next-line no-console
      console.debug(metric);
    }
  });

  return null;
});

export default WebVitals;
