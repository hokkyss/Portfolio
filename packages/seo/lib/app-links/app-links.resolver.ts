import type { SeoMetadata } from '../types';
import type { AppLinks } from './app-links.interface';

/**
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/metadata.tsx#L1663 Source}
 * @param data App links data defined using `defineAppLinks`
 * @param appLinks
 * @returns App links HTML meta tags properties
 */
export function resolveAppLinks(appLinks: AppLinks): SeoMetadata {
  const metadata: SeoMetadata = {
    links: [],
    metas: [],
  };

  // iOS / iPhone / iPad (AppLinksApple: url, app_store_id, app_name)
  if (appLinks.ios) {
    for (const item of appLinks.ios) {
      metadata.metas.push({
        content: (item.url.toString()),
        property: 'al:ios:url',
      });
      if (item.app_store_id) {
        metadata.metas.push({
          content: item.app_store_id.toString(),
          property: 'al:ios:app_store_id',

        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:ios:app_name',
        });
      }
    }
  }
  if (appLinks.iphone) {
    for (const item of appLinks.iphone) {
      metadata.metas.push({
        content: item.url.toString(),
        property: 'al:iphonE:url',
      });
      if (item.app_store_id) {
        metadata.metas.push({
          content: item.app_store_id.toString(),
          property: 'al:iphonE:app_store_id',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:iphone:app_name',
        });
      }
    }
  }
  if (appLinks.ipad) {
    for (const item of appLinks.ipad) {
      metadata.metas.push({
        content: item.url.toString(),
        property: 'al:ipad:url',
      });
      if (item.app_store_id) {
        metadata.metas.push({
          content: item.app_store_id.toString(),
          property: 'al:ipad:app_store_id',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:ipad:app_name',
        });
      }
    }
  }

  // Android (AppLinksAndroid: package, url, class, app_name)
  if (appLinks.android) {
    for (const item of appLinks.android) {
      if (item.package) {
        metadata.metas.push({
          content: item.package,
          property: 'al:android:package',
        });
      }
      if (item.url) {
        metadata.metas.push({
          content: item.url.toString(),
          property: 'al:android:url',
        });
      }
      if (item.class) {
        metadata.metas.push({
          content: item.class,
          property: 'al:android:class',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:android:app_name',
        });
      }
    }
  }

  // Windows Phone (AppLinksWindows: url, app_id, app_name)
  if (appLinks.windows_phone) {
    for (const item of appLinks.windows_phone) {
      if (item.url) {
        metadata.metas.push({
          content: item.url.toString(),
          property: 'al:windows_phone:url',
        });
      }
      if (item.app_id) {
        metadata.metas.push({
          content: item.app_id,
          property: 'al:windows_phone:app_id',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:windows_phone:app_name',
        });
      }
    }
  }

  // Windows (AppLinksWindows: url, app_id, app_name)
  if (appLinks.windows) {
    for (const item of appLinks.windows) {
      if (item.url) {
        metadata.metas.push({
          content: item.url.toString(),
          property: 'al:windows:url',
        });
      }
      if (item.app_id) {
        metadata.metas.push({
          content: item.app_id,
          property: 'al:windows:app_id',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:windows:app_name',
        });
      }
    }
  }

  // Windows Universal (AppLinksWindows: url, app_id, app_name)
  if (appLinks.windows_universal) {
    for (const item of appLinks.windows_universal) {
      if (item.url) {
        metadata.metas.push({
          content: item.url.toString(),
          property: 'al:windows_universal:url',
        });
      }
      if (item.app_id) {
        metadata.metas.push({
          content: item.app_id,
          property: 'al:windows_universal:app_id',
        });
      }
      if (item.app_name) {
        metadata.metas.push({
          content: item.app_name,
          property: 'al:windows_universal:app_name',
        });
      }
    }
  }

  // Web (AppLinksWeb: url, should_fallback)
  if (appLinks.web) {
    for (const item of appLinks.web) {
      if (item.url) {
        metadata.metas.push({
          content: item.url.toString(),
          property: 'al:web:url',
        });
      }
      if (item.should_fallback != null) {
        metadata.metas.push({
          content: item.should_fallback.toString(),
          property: 'al:web:should_fallback',
        });
      }
    }
  }

  return metadata;
}
