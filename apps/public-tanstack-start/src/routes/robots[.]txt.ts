import { defineRobots, resolveRobots } from '@portfolio/seo/robots';
import { createFileRoute } from '@tanstack/react-router';
import { getOrigin } from '@tanstack/react-router/ssr/server';
import { getServerEnv } from '../configs/env/env.config';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers({ createHandlers }) {
      return createHandlers({
        GET: {
          handler: (ctx) => {
            const serverEnv = getServerEnv();
            const origin = getOrigin(ctx.request);

            const robots = defineRobots({
              host: origin,
              rules: {
                allow: serverEnv.enableRobots ? '/' : undefined,
                disallow: serverEnv.enableRobots ? undefined : '*',
                userAgent: '*',
              },
              sitemap: new URL('sitemap.xml', origin).toString(),
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
