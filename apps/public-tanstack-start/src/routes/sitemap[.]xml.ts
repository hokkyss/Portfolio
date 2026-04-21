import { defineSitemap, resolveSitemap } from '@portfolio/seo/sitemap';
import { createFileRoute } from '@tanstack/react-router';
import { getOrigin } from '@tanstack/react-router/ssr/server';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers({ createHandlers }) {
      return createHandlers({
        GET: {
          handler: (ctx) => {
            const origin = getOrigin(ctx.request);

            const sitemap = defineSitemap([{
              changeFrequency: 'daily',
              lastModified: new Date().toISOString(),
              priority: 1,
              url: origin,
            }]);

            return new Response(resolveSitemap(sitemap), {
              headers: {
                'Content-Type': 'application/xml',
              },
            });
          },
        },
      });
    },
  },
});
