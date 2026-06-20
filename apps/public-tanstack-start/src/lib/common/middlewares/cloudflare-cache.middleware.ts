import { caches, Request as CfRequest, RequestInit as CfRequestInit, Response as CfResponse } from '@cloudflare/workers-types';
import { createMiddleware } from '@tanstack/react-start';
import { getExecutionContext } from '../async-storages/cloudflare-execution-context.storage';

const cloudflareCacheMiddleware = createMiddleware({
  type: 'request',
}).server(async (ctx) => {
  // if we are running in cloudflare, use cloudflare cache features
  if (__CLOUDFLARE__) {
    const cacheKey = new CfRequest(ctx.request.url, ctx.request as CfRequestInit);

    const cachedResponse = await caches.default.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse as unknown as Response;
    }

    // Cache MISS, execute handler
    const middlewareResult = await ctx.next();

    const executionContext = getExecutionContext();

    // Cache only for GET requests
    if (ctx.request.method === 'GET') {
      executionContext.waitUntil(caches.default.put(cacheKey, middlewareResult.response.clone() as unknown as CfResponse));
    }

    return middlewareResult;
  }

  return ctx.next();
});

export default cloudflareCacheMiddleware;
