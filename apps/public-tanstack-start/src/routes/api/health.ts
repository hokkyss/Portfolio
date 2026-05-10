import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: () => {
          return Response.json({
            buildId: __BUILD_NUMBER__,
            status: 'ok',
            version: __APP_VERSION__,
          });
        },
      }),
  },
});
