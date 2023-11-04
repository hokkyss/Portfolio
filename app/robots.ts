import type { MetadataRoute } from 'next';

import serverEnvConfig from './_server/configs/env.config';

export default function generateRobots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: '/',
      disallow: '/private/',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', serverEnvConfig.url).toString(),
  };
}
