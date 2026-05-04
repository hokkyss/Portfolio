import { match } from 'ts-pattern';
import type { SeoMetadata } from '../types';
import type { Twitter } from './twitter.interface';

/**
 * Convert twitter configuration to meta tags properties
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/metadata.tsx#L1505 Next.js source code}
 * @param data - Twitter configuration defined using `defineTwitter`
 * @returns twitter meta tags properties
 */
export function resolveTwitter(data: Twitter): SeoMetadata {
  const metadata: SeoMetadata = {
    links: [],
    metas: [],
  };

  metadata.metas.push({
    content: data.card || 'summary_large_image',
    name: 'twitter:card',
  });

  if (data.site) {
    metadata.metas.push({
      content: data.site,
      name: 'twitter:site',
    });
  }

  if (data.siteId) {
    metadata.metas.push({
      content: data.siteId,
      name: 'twitter:site:id',
    });
  }
  if (data.creator) {
    metadata.metas.push({
      content: data.creator,
      name: 'twitter:creator',
    });
  }
  if (data.creatorId) {
    metadata.metas.push({
      content: data.creatorId,
      name: 'twitter:creator:id',
    });
  }
  if (data.title) {
    metadata.metas.push({
      content: data.title,
      name: 'twitter:title',
    });
  }
  if (data.description) {
    metadata.metas.push({
      content: data.description,
      name: 'twitter:description',
    });
  }

  // Twitter images
  if (data.images) {
    for (const image of data.images) {
      if (typeof image === 'string' || image instanceof URL) {
        metadata.metas.push({
          content: image.toString(),
          name: 'twitter:image',
        });
      } else {
        if (image.url) {
          metadata.metas.push({
            content: image.url.toString(),
            name: 'twitter:image',
          });
        }
        if (image.alt) {
          metadata.metas.push({
            content: image.alt,
            name: 'twitter:image:alt',
          });
        }
        if (image.secureUrl) {
          metadata.metas.push({
            content: image.secureUrl.toString(),
            name: 'twitter:image:secure_url',
          });
        }
        if (image.type) {
          metadata.metas.push({
            content: image.type,
            name: 'twitter:image:type',
          });
        }
        if (image.width) {
          metadata.metas.push({
            content: String(image.width),
            name: 'twitter:image:width',
          });
        }
        if (image.height) {
          metadata.metas.push({
            content: String(image.height),
            name: 'twitter:image:height',
          });
        }
      }
    }
  }

  match(data)
    .when((tw) => tw.card === 'player', (tw) => {
      for (const player of tw.players) {
        metadata.metas.push({
          content: player.playerUrl.toString(),
          name: 'twitter:player',
        });
        metadata.metas.push({
          content: player.streamUrl.toString(),
          name: 'twitter:player:stream',
        });
        metadata.metas.push({
          content: player.width.toString(),
          name: 'twitter:player:width',
        });
        metadata.metas.push({
          content: player.height.toString(),
          name: 'twitter:player:height',
        });
      }
    })
    .when((tw) => tw.card === 'app', (tw) => {
      for (const platform of ['iphone', 'ipad', 'googleplay'] as const) {
        if (tw.app.name) {
          metadata.metas.push({
            content: tw.app.name,
            name: `twitter:app:name:${platform}`,
          });
        }
        if (tw.app.id[platform]) {
          metadata.metas.push({
            content: String(tw.app.id[platform]),
            name: `twitter:app:id:${platform}`,
          });
        }
        if (tw.app.url?.[platform]) {
          metadata.metas.push({
            content: tw.app.url[platform].toString(),
            name: `twitter:app:url:${platform}`,
          });
        }
      }
    })
    .otherwise(() => {});

  return metadata;
}
