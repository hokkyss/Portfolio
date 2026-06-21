import type { CacheStorage, Request as CfRequest, Response as CfResponse } from '@cloudflare/workers-types';
import { createMiddleware } from '@tanstack/react-start';
import { getExecutionContext } from '../async-storages/cloudflare-execution-context.storage';

const cacheMiddleware = createMiddleware({
  type: 'request',
})
  .server(async (ctx) => {
    // if we are running in cloudflare, use cloudflare cache features
    if (__CLOUDFLARE__) {
      const cacheKey = new Request(ctx.request.url, ctx.request) as unknown as CfRequest;
      const cache = (caches as unknown as CacheStorage).default;

      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        const clonedCachedResponse = new Response(cachedResponse.body as never, cachedResponse as never);
        clonedCachedResponse.headers.set('X-Cache-Status', 'HIT');
        clonedCachedResponse.headers.delete('X-Cache-Maxage');
        clonedCachedResponse.headers.delete('X-Stale-After');
        return clonedCachedResponse;
      }

      // Cache MISS, execute handler
      const middlewareResult = await ctx.next();

      // Cache only for GET requests
      if (ctx.request.method === 'GET' && middlewareResult.response.ok) {
        const response = processCacheHeaders(middlewareResult.response);
        const executionContext = getExecutionContext();

        executionContext.waitUntil(cache.put(cacheKey, response.clone() as unknown as CfResponse));
        return response;
      }

      return middlewareResult;
    }

    // Non-Cloudflare environment
    const middlewareResult = await ctx.next();

    if (ctx.request.method === 'GET' && middlewareResult.response.ok) {
      return processCacheHeaders(middlewareResult.response);
    }

    return middlewareResult;
  });

/**
 * @param response
 */
function processCacheHeaders(response: Response) {
  const clonedResponse = new Response(response.body, response);

  // Try to use ctx.response.headers if available
  const headers = new Headers(clonedResponse.headers);

  const xCacheMaxage = clonedResponse.headers.get('X-Cache-Maxage');
  const xStaleAfter = clonedResponse.headers.get('X-Stale-After');

  if (!xCacheMaxage || !xStaleAfter) {
    return clonedResponse;
  }

  if (__CLOUDFLARE__) {
    // this might seem weird, but this is intentional.
    // Cache-Control is browser cache, CDN-Cache-Control is cloudflare cache
    // We want to go to cloudflare cache only if browser cache has expired.
    // in this case, stale time is on the browser, while max cache time is on cloudflare.
    headers.set('Cache-Control', `public, max-age=${xStaleAfter}`);
    headers.set('CDN-Cache-Control', `max-age=${xCacheMaxage}`);
  } else if (__NETLIFY__) {
    headers.set('Netlify-CDN-Cache-Control', `public, maxage=${xCacheMaxage}, s-maxage=${xCacheMaxage}, stale-while-revalidate=${xStaleAfter}`);
  } else {
    headers.set('Cache-Control', `public, max-age=${xCacheMaxage}, s-maxage=${xCacheMaxage}, stale-while-revalidate=${xStaleAfter}`);
  }

  headers.delete('X-Cache-Maxage');
  headers.delete('X-Stale-After');

  return clonedResponse;
}

export default cacheMiddleware;
