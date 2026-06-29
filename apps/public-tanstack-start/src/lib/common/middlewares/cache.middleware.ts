import type { CacheStorage, Request as CfRequest, Response as CfResponse } from '@cloudflare/workers-types';
import { createMiddleware } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import requestIdMiddleware from '../../../clients/logger/middlewares/request-id.middleware';
import { getExecutionContext } from '../async-storages/cloudflare-execution-context.storage';

const cacheMiddleware = createMiddleware({
  type: 'request',
})
  // despite requests being cached, we want the request id to be updated.
  // NOTE: Is that possible? It's worth trying.
  .middleware([requestIdMiddleware])
  .server(async (ctx) => {
    // bail out early
    // Cache only for GET requests
    if (ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD') {
      return ctx.next();
    }

    // if we are running in cloudflare, use cloudflare cache features
    if (__CLOUDFLARE__) {
      const cacheKey = new Request(ctx.request.url, ctx.request) as unknown as CfRequest;
      const cache = (caches as unknown as CacheStorage).default;

      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        setResponseHeader('X-Cache-Status', 'HIT');
        // we hope requestId middleware can set request id successfully, so the cached X-Request-Id is replaced.
        return new Response(cachedResponse.body as never, cachedResponse as never);
      }

      setResponseHeader('X-Cache-Status', 'MISS');
      // Cache MISS, execute handler
      const middlewareResult = await ctx.next();

      // cache only if the response is 200 OK
      if (middlewareResult.response.ok) {
        const [response, shouldCache] = processCacheHeaders(middlewareResult.response);
        if (shouldCache) {
          const executionContext = getExecutionContext();
          executionContext.waitUntil(cache.put(cacheKey, response.clone() as unknown as CfResponse));
        }
        return response;
      }

      return middlewareResult;
    }

    // Non-Cloudflare environment
    const middlewareResult = await ctx.next();

    // cache only if the response is 200 OK
    if (middlewareResult.response.ok) {
      const [response] = processCacheHeaders(middlewareResult.response);

      return response;
    }

    return middlewareResult;
  });

/**
 * @param response
 */
function processCacheHeaders(response: Response): [Response, shouldCache: boolean] {
  const xCacheMaxage = response.headers.get('X-Cache-Maxage');
  const xStaleAfter = response.headers.get('X-Stale-After');

  if (!xCacheMaxage || !xStaleAfter) {
    return [response, false];
  }

  const clonedResponse = new Response(response.body, response);
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

  return [clonedResponse, true];
}

export default cacheMiddleware;
