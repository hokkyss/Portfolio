import { match } from 'ts-pattern';
import type { Twitter } from './twitter.interface';

/**
 * Convert twitter configuration to meta tags properties
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/metadata.tsx#L1505 Next.js source code}
 * @param data - Twitter configuration defined using `defineTwitter`
 * @returns twitter meta tags properties
 */
export function resolveTwitter(data: Twitter): Array<{ content: string; name: string }> {
  const metas: Array<{ content: string; name: string }> = [];

  metas.push({
    content: data.card || 'summary_large_image',
    name: 'twitter:card',
  });

  if (data.site) {
    metas.push({
      content: data.site,
      name: 'twitter:site',
    });
  }

  if (data.siteId) {
    metas.push({
      content: data.siteId,
      name: 'twitter:site:id',
    });
  }
  if (data.creator) {
    metas.push({
      content: data.creator,
      name: 'twitter:creator',
    });
  }
  if (data.creatorId) {
    metas.push({
      content: data.creatorId,
      name: 'twitter:creator:id',
    });
  }
  if (data.title) {
    metas.push({
      content: data.title,
      name: 'twitter:title',
    });
  }
  if (data.description) {
    metas.push({
      content: data.description,
      name: 'twitter:description',
    });
  }

  // Twitter images
  if (data.images) {
    for (const image of data.images) {
      if (typeof image === 'string' || image instanceof URL) {
        metas.push({
          content: image.toString(),
          name: 'twitter:image',
        });
      } else {
        if (image.url) {
          metas.push({
            content: image.url.toString(),
            name: 'twitter:image',
          });
        }
        if (image.alt) {
          metas.push({
            content: image.alt,
            name: 'twitter:image:alt',
          });
        }
        if (image.secureUrl) {
          metas.push({
            content: image.secureUrl.toString(),
            name: 'twitter:image:secure_url',
          });
        }
        if (image.type) {
          metas.push({
            content: image.type,
            name: 'twitter:image:type',
          });
        }
        if (image.width) {
          metas.push({
            content: String(image.width),
            name: 'twitter:image:width',
          });
        }
        if (image.height) {
          metas.push({
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
        metas.push({
          content: player.playerUrl.toString(),
          name: 'twitter:player',
        });
        metas.push({
          content: player.streamUrl.toString(),
          name: 'twitter:player:stream',
        });
        metas.push({
          content: player.width.toString(),
          name: 'twitter:player:width',
        });
        metas.push({
          content: player.height.toString(),
          name: 'twitter:player:height',
        });
      }
    })
    .when((tw) => tw.card === 'app', (tw) => {
      for (const platform of ['iphone', 'ipad', 'googleplay'] as const) {
        if (tw.app.name) {
          metas.push({
            content: tw.app.name,
            name: `twitter:app:name:${platform}`,
          });
        }
        if (tw.app.id[platform]) {
          metas.push({
            content: String(tw.app.id[platform]),
            name: `twitter:app:id:${platform}`,
          });
        }
        if (tw.app.url?.[platform]) {
          metas.push({
            content: tw.app.url[platform].toString(),
            name: `twitter:app:url:${platform}`,
          });
        }
      }
    })
    .otherwise(() => {});

  return metas;
}
