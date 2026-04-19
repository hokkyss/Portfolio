import { Manifest } from './manifest.interface';

/**
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/build/webpack/loaders/metadata/resolve-route-data.ts#L148 Source}
 * @param data Manifest data defined using `defineManifest`
 * @returns Manifest JSON string
 */
export function resolveManifest(data: Manifest): string {
  return JSON.stringify(data);
}
