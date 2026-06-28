import ApplicationError from '@portfolio/common/errors/application-error';
import { createIsomorphicFn } from '@tanstack/react-start';

/**
 * Extract the origin (scheme + host) from a Request object.
 *
 * **SERVER-ONLY**
 * @see {@link https://github.com/TanStack/router/blob/v1.166.7/packages/router-core/src/ssr/ssr-server.ts#L387 Original implementation}
 * @param request
 * @returns current origin
 * @example
 * ```
 * const request = getRequest();
 * const origin = getOrigin(request);
 *
 * // Then you can create a sitemap.xml file
 * const sitemap = defineSitemap({
 *   host: origin,
 *   routes: [
 *     { path: '/' },
 *     { path: '/blog' },
 *     { path: '/projects' },
 *     { path: '/tech-stacks' },
 *   ],
 * });
 * ```
 */
const getOrigin = createIsomorphicFn()
  .server((request: Request) => {
    try {
      return new URL(request.url).origin;
    } catch {
    // fallback – identical to the upstream implementation
    }
    return 'http://localhost';
  })
  .client(() => {
    throw new ApplicationError(500, 'getOrigin function can only run in server environment');
  });

export default getOrigin;
