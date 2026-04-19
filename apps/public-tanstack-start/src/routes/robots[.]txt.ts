import { defineRobots, resolveRobots } from '@portfolio/common/robots';
import { createFileRoute } from '@tanstack/react-router';
import { getOrigin } from '@tanstack/react-router/ssr/server';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers({ createHandlers }) {
      return createHandlers({
        GET: {
          handler: (ctx) => {
            const origin = getOrigin(ctx.request);

            const robots = defineRobots({
              host: origin,
              rules: {
                allow: import.meta.env.DEV ? undefined : '/',
                disallow: import.meta.env.DEV ? '*' : '/private',
                userAgent: '*',
              },
              sitemap: 'sitemap.xml',
            });

            return new Response(resolveRobots(robots), {
              headers: {
                'Content-Type': 'text/plain',
              },
            });
          },
        },
      });
    },
  },
});
