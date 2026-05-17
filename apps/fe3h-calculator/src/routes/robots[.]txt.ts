import { defineRobots, resolveRobots } from '@portfolio/seo/robots';
import { createFileRoute } from '@tanstack/react-router';
import { getOrigin } from '@tanstack/react-router/ssr/server';
import { getServerEnv } from '../lib/common/configs/env/env.config';

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
