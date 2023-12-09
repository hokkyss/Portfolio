import type { MetadataRoute } from 'next';

import envConfig from './_common/configs/env.config';

export default function generateSitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'daily',
      lastModified: new Date().toISOString(),
      priority: 1,
      url: envConfig.appUrl,
    },
  ];
}
