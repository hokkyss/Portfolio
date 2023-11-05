import type { MetadataRoute } from 'next';

import envConfig from './_common/configs/env.config';

export default function generateSitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'daily',
      lastModified: '2023-11-04T11:52:00.000+0700',
      priority: 1,
      url: envConfig.appUrl,
    },
  ];
}
