import { Resvg } from '@resvg/resvg-js';
import { createFileRoute } from '@tanstack/react-router';
import satori from 'satori';

export const Route = createFileRoute('/favicon.ico')({
  server: {
    handlers: ({ createHandlers }) => createHandlers({
      GET: async (ctx) => {
        const svg = await satori(
          <div style={{ color: 'blue' }}>Hello</div>,
          {
            fonts: [],
            height: 256,
            width: 256,
          },
        );

        const png = new Resvg(svg).render().asPng();

        return new Response(new Blob([png], { type: 'image/png' }), {
          headers: {
            'content-type': 'image/png',
          },
        });
      },
    }),
  },
});
