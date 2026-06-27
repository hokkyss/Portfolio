/**
 * Extract the origin (scheme + host) from a Request object.
 *
 * This is a local reimplementation of `getOrigin` from
 * `@tanstack/react-router/ssr/server` to avoid pulling the full SSR
 * renderer into the RSC build graph.
 *
 * @see https://github.com/TanStack/router/issues/7177
 * @see https://github.com/TanStack/router/pull/7183
 *
 * The `./ssr/server` sub-export of `@tanstack/react-router` has no
 * `react-server` export condition, so importing it in route files causes
 * `renderRouterToStream.js` (which imports `react-dom/server`) to be
 * bundled into the RSC environment where `react-dom/server` is forbidden.
 *
 * TODO: Remove this once `@tanstack/react-router` adds a `react-server`
 * condition to its `./ssr/server` export.
 */
export function getOrigin(request: Request): string {
  try {
    return new URL(request.url).origin;
  } catch {
    // fallback – identical to the upstream implementation
  }
  return 'http://localhost';
}
