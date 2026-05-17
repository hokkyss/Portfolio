import { Resvg } from '@resvg/resvg-js';
import { createFileRoute } from '@tanstack/react-router';
import satori from 'satori';

export const Route = createFileRoute('/favicon.ico')({
  server: {
    handlers: ({ createHandlers }) => createHandlers({
      GET: async () => {
        const svg = await satori(
          <div style={{ background: '#0000FF', height: '100%', width: '100%' }}></div>,
          {
            fonts: [],
            height: 16,
            width: 16,
          },
        );

        const png = new Resvg(svg).render().asPng();

        return new Response(new Blob([png as BlobPart], { type: 'image/png' }), {
          headers: {
            'content-type': 'image/png',
          },
        });
      },
    }),
  },
});
