import type { SeoMetadata } from '../types';
import type { Icons } from './icons.interface';

/**
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/metadata.tsx#L1912 Source}
 * @param icons - Icons data defined using `defineIcons`
 * @returns Icons HTML meta tags properties
 */
export function resolveIcons(icons: Icons): SeoMetadata {
  const metadata: SeoMetadata = {
    links: [],
    metas: [],
  };

  const { apple, icon, other, shortcut } = icons;

  if (shortcut) {
    for (const ic of shortcut) {
      if (typeof ic === 'string' || ic instanceof URL) {
        metadata.links.push({
          href: ic.toString(),
          rel: 'shortcut icon',
        });
      } else {
        metadata.links.push({
          color: ic.color,
          fetchPriority: ic.fetchPriority,
          href: ic.url.toString(),
          media: ic.media,
          rel: ic.rel || 'shortcut icon',
          sizes: ic.sizes,
          type: ic.type,
        });
      }
    }
  }
  if (icon) {
    for (const ic of icon) {
      if (typeof ic === 'string' || ic instanceof URL) {
        metadata.links.push({
          href: ic.toString(),
          rel: 'icon',
        });
      } else {
        metadata.links.push({
          color: ic.color,
          fetchPriority: ic.fetchPriority,
          href: ic.url.toString(),
          media: ic.media,
          rel: ic.rel || 'icon',
          sizes: ic.sizes,
          type: ic.type,
        });
      }
    }
  }
  if (apple) {
    for (const ic of apple) {
      if (typeof ic === 'string' || ic instanceof URL) {
        metadata.links.push({
          href: ic.toString(),
          rel: 'apple-touch-icon',
        });
      } else {
        metadata.links.push({
          color: ic.color,
          fetchPriority: ic.fetchPriority,
          href: ic.url.toString(),
          media: ic.media,
          rel: ic.rel || 'apple-touch-icon',
          sizes: ic.sizes,
          type: ic.type,
        });
      }
    }
  }
  if (other) {
    for (const ic of other) {
      metadata.links.push({
        color: ic.color,
        fetchPriority: ic.fetchPriority,
        href: ic.url.toString(),
        media: ic.media,
        rel: ic.rel || 'icon',
        sizes: ic.sizes,
        type: ic.type,
      });
    }
  }

  return metadata;
}
