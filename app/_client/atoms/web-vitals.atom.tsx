'use client';

import 'client-only';

import { useReportWebVitals } from 'next/web-vitals';

import envConfig from '~/_common/configs/env.config';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (envConfig.__DEV__) {
      // NOTE: console is only on development
      // eslint-disable-next-line no-console
      console.debug(metric);
    }
  });

  return <span className="absolute hidden" id="web-vitals" />;
}
