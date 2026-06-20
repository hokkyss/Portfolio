import type { BrowserRun } from '@cloudflare/workers-types';
import ApplicationError from '@portfolio/common/errors/application-error';
import { createFileRoute } from '@tanstack/react-router';
import { env } from 'cloudflare:workers';

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
            return Response.json({ error: 'Missing url parameter' }, {
              status: 400,
            });
          }

          let parsedUrl: URL;
          try {
            parsedUrl = new URL(urlParam);
          } catch {
            return Response.json({ error: 'Invalid url parameter' }, {
              status: 400,
            });
          }

          if (!ALLOWED_ORIGINS.includes(parsedUrl.hostname)) {
            return Response.json({ error: 'URL not in allowlist' }, {
              status: 403,
            });
          }

          if (__CLOUDFLARE__) {
            const browser = env.BROWSER as unknown as BrowserRun;
            const response = await browser.quickAction('screenshot', {
              url: urlParam,
            });
            response.headers.set('Cache-Control', 'public, max-age=86400');
            response.headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');

            return response as unknown as Response;
          }

          const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
            import('@sparticuz/chromium'),
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

            return new Response(new Blob([screenshot as unknown as BlobPart], { type: 'image/png' }), {
              headers: {
                'Cache-Control': 'public, max-age=86400',
                'CDN-Cache-Control': 'max-age=604800',
                'Content-Type': 'image/png',
              },
            });
          } catch (e) {
            const error = e as Error;
            ctx.context.logger.error(error);
            return Response.json({
              message: error.message,
              stack: error.stack,
            }, {
              status: e instanceof ApplicationError ? e.status : 500,
            });
          } finally {
            await browser.close();
          }
        },
      }),
  },
});
