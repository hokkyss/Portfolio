import type { MetadataRoute } from 'next';

import envConfig from './_common/configs/env.config';

export default function generateRobots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: envConfig.__DEV__ ? undefined : '/',
      disallow: envConfig.__DEV__ ? '*' : '/private',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', envConfig.appUrl).toString(),
  };
}
