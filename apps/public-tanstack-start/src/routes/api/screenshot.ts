import { createFileRoute } from '@tanstack/react-router';

/** Allowed origin hostnames for screenshot requests (URL allowlist). */
const ALLOWED_ORIGINS = [
  'i-am.hokkyss.com',
  'hokkyss.com',
  'link.hokkyss.com',
  // add more project domains here as needed
];

export const Route = createFileRoute('/api/screenshot')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async (ctx) => {
          const urlParam = new URL(ctx.request.url).searchParams.get('url');

          if (!urlParam) {
            return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
              headers: { 'content-type': 'application/json' },
              status: 400,
            });
          }

          let parsedUrl: URL;
          try {
            parsedUrl = new URL(urlParam);
          } catch {
            return new Response(JSON.stringify({ error: 'Invalid url parameter' }), {
              headers: { 'content-type': 'application/json' },
              status: 400,
            });
          }

          if (!ALLOWED_ORIGINS.includes(parsedUrl.hostname)) {
            return new Response(JSON.stringify({ error: 'URL not in allowlist' }), {
              headers: { 'content-type': 'application/json' },
              status: 403,
            });
          }

          // Lazy-load heavy deps so they don't affect cold start for other routes
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore – @sparticuz/chromium installed at deploy time
          const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
            import('@sparticuz/chromium'),
            // @ts-ignore – puppeteer-core installed at deploy time
            import('puppeteer-core'),
          ]);

          const browser = await puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: { height: 800, width: 1280 },
            executablePath: await chromium.executablePath(),
            headless: true,
          });

          try {
            const page = await browser.newPage();
            await page.goto(urlParam, { timeout: 15_000, waitUntil: 'networkidle2' });
            const screenshot = await page.screenshot({ type: 'png' });

            return new Response(new Blob([screenshot], { type: 'image/png' }), {
              headers: {
                'cache-control': 'public, max-age=604800, stale-while-revalidate=86400',
                'content-type': 'image/png',
              },
            });
          } finally {
            await browser.close();
          }
        },
      }),
  },
});
