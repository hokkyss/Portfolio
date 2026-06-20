import type { CacheStorage, Request as CfRequest, Response as CfResponse } from '@cloudflare/workers-types';
import { createMiddleware } from '@tanstack/react-start';
import { getExecutionContext } from '../async-storages/cloudflare-execution-context.storage';

const cacheMiddleware = createMiddleware({
  type: 'request',
}).server(async (ctx) => {
  // if we are running in cloudflare, use cloudflare cache features
  if (__CLOUDFLARE__) {
    const cacheKey = new Request(ctx.request.url, ctx.request) as unknown as CfRequest;
    const cache = (caches as unknown as CacheStorage).default;

    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse as unknown as Response;
    }

    // Cache MISS, execute handler
    const middlewareResult = await ctx.next();

    const response = processCacheHeaders(middlewareResult.response);

    const executionContext = getExecutionContext();

    // Cache only for GET requests
    if (ctx.request.method === 'GET') {
      executionContext.waitUntil(cache.put(cacheKey, middlewareResult.response as unknown as CfResponse));
    }

    return response;
  }

  // Non-Cloudflare environment
  const middlewareResult = await ctx.next();

  return processCacheHeaders(middlewareResult.response);
});

/**
 * @param response
 */
function processCacheHeaders(response: Response) {
  // Try to use ctx.response.headers if available
  const clonedResponse = response.clone();

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
    clonedResponse.headers.set('Cache-Control', `public, max-age=${xStaleAfter}`);
    clonedResponse.headers.set('CDN-Cache-Control', `max-age=${xCacheMaxage}`);
  } else if (__NETLIFY__) {
    clonedResponse.headers.set('Netlify-CDN-Cache-Control', `public, maxage=${xCacheMaxage}, s-maxage=${xCacheMaxage}, stale-while-revalidate=${xStaleAfter}`);
  } else {
    clonedResponse.headers.set('Cache-Control', `public, max-age=${xCacheMaxage}, s-maxage=${xCacheMaxage}, stale-while-revalidate=${xStaleAfter}`);
  }

  clonedResponse.headers.delete('X-Cache-Maxage');
  clonedResponse.headers.delete('X-Stale-After');

  return clonedResponse;
}

export default cacheMiddleware;
