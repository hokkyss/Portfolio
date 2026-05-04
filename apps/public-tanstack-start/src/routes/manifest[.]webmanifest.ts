import { defineManifest, resolveManifest } from '@portfolio/seo/manifest';
import { createFileRoute } from '@tanstack/react-router';
import { getOrigin } from '@tanstack/react-router/ssr/server';

export const Route = createFileRoute('/manifest.webmanifest')({
  server: {
    handlers({ createHandlers }) {
      return createHandlers({
        GET: {
          handler: (ctx) => {
            const origin = getOrigin(ctx.request);

            const manifest = defineManifest({
              background_color: '#fff',
              description: 'Hokki Suwanda\'s Portfolio Web Application',
              dir: 'ltr',
              display: 'standalone',
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
              scope: origin,
              short_name: 'hokkyss',
              start_url: '/',
              theme_color: '#fff',
            });

            return new Response(resolveManifest(manifest), {
              headers: {
                'Content-Type': 'application/manifest+json',
              },
            });
          },
        },
      });
    },
  },
});
