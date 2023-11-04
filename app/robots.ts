import type { MetadataRoute } from 'next';

import envConfig from './_common/configs/env.config';

export default function generateRobots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: '/',
      disallow: '/private/',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', envConfig.url).toString(),
  };
}
