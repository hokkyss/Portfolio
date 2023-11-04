import type { MetadataRoute } from 'next';

import serverEnvConfig from './_server/configs/env.config';

export default function generateManifest(): MetadataRoute.Manifest {
  return {
    background_color: '#fff',
    description: "Hokki Suwanda's Portfolio Web Application using Next.js",
    dir: 'ltr',
    display: 'browser',
    icons: [
      {
        sizes: '16x16 32x32 48x48',
        src: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        sizes: '180x180',
        src: '/apple-icon.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/icon.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: './opengraph-image.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: './twitter-image.png',
        type: 'image/png',
      },
    ],
    lang: 'en',
    name: 'hokkyss Portfolio',
    orientation: 'any',
    scope: serverEnvConfig.url,
    short_name: 'hokkyss',
    start_url: '/',
    theme_color: '#fff',
  };
}
