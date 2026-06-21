import { createFileRoute, notFound } from '@tanstack/react-router';
import { resolve } from 'node:path';

export const Route = createFileRoute('/.well-known/appspecific/com.chrome.devtools.json')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: (ctx) => {
          if (!import.meta.env.DEV) {
            throw notFound();
          }

          return Response.json({
            workspace: {
              root: resolve(
                // appspecific
                import.meta.dirname,
                // .well-known
                '..',
                // routes
                '..',
                // src
                '..',
              ),
              uuid: ctx.context.requestId,
            },
          }, {
            status: 200,
          });
        },
      }),
  },
});
