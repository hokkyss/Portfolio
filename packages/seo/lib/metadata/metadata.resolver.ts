import { SeoMetadata } from '../types';
import { Metadata } from './metadata.interface';

/**
 * Resolves metadata object into SEO metadata
 * @param metadata Object returned from `defineMetadata`
 * @returns SEO metas and links tag (or `title` tag for title)
 */
export function resolveMetadata(metadata: Metadata): SeoMetadata {
  const result: SeoMetadata = {
    links: [],
    metas: [],
  };

  if (metadata.title) {
    result.metas.push({
      title: metadata.title,
    });
  }

  if (metadata.applicationName) {
    result.metas.push({
      content: metadata.applicationName,
      name: 'application-name',
    });
  }

  // --- Authors ---
  if (metadata.authors) {
    for (const author of metadata.authors) {
      if (author.url) {
        result.links.push({ href: author.url.toString(), rel: 'author' });
      }
      if (author.name) {
        result.metas.push({ content: author.name, name: 'author' });
      }
    }
  }

  if (metadata.manifest) {
    result.links.push({
      href: metadata.manifest.toString(),
      rel: 'manifest',
    });
  }

  if (metadata.generator) {
    result.metas.push({ content: metadata.generator, name: 'generator' });
  }
  if (metadata.keywords && metadata.keywords.length) {
    result.metas.push({ content: Array.isArray(metadata.keywords) ? metadata.keywords.join(',') : metadata.keywords, name: 'keywords' });
  }
  if (metadata.referrer) {
    result.metas.push({ content: metadata.referrer, name: 'referrer' });
  }
  if (metadata.creator) {
    result.metas.push({ content: metadata.creator, name: 'creator' });
  }
  if (metadata.publisher) {
    result.metas.push({ content: metadata.publisher, name: 'publisher' });
  }
  if (metadata.abstract) {
    result.metas.push({ content: metadata.abstract, name: 'abstract' });
  }

  // --- Link rel arrays ---
  if (metadata.archives) {
    for (const archive of metadata.archives) {
      result.links.push({ href: archive, rel: 'archives' });
    }
  }
  if (metadata.assets) {
    for (const asset of metadata.assets) {
      result.links.push({ href: asset, rel: 'assets' });
    }
  }
  if (metadata.bookmarks) {
    for (const bookmark of metadata.bookmarks) {
      result.links.push({ href: bookmark, rel: 'bookmarks' });
    }
  }

  if (metadata.pagination) {
    if (metadata.pagination.previous) {
      result.links.push({ href: metadata.pagination.previous.toString(), rel: 'prev' });
    }
    if (metadata.pagination.next) {
      result.links.push({ href: metadata.pagination.next.toString(), rel: 'next' });
    }
  }

  if (metadata.category) {
    result.metas.push({ content: metadata.category, name: 'category' });
  }
  if (metadata.classification) {
    result.metas.push({ content: metadata.classification, name: 'classification' });
  }

  // --- Other (arbitrary name/value pairs) ---
  if (metadata.other) {
    for (const [name, content] of Object.entries(metadata.other)) {
      if (Array.isArray(content)) {
        for (const contentItem of content) {
          if (contentItem != null && contentItem !== '') {
            result.metas.push({ content: String(contentItem), name });
          }
        }
      } else if (content != null && content !== '') {
        result.metas.push({ content: String(content), name });
      }
    }
  }

  if (metadata.alternates) {
    const { canonical, languages, media, types } = metadata.alternates;

    if (canonical && typeof canonical === 'object' && 'url' in canonical && canonical.url) {
      result.links.push({
        href: canonical.url.toString(),
        rel: 'canonical',
        title: canonical.title,
      });
    } else if (canonical && (typeof canonical === 'string' || canonical instanceof URL)) {
      result.links.push({
        href: canonical.toString(),
        rel: 'canonical',
      });
    }

    if (languages) {
      for (const [locale, descriptors] of Object.entries(languages)) {
        if (descriptors) {
          const descriptorList = Array.isArray(descriptors) ? descriptors : [descriptors];
          for (const descriptor of descriptorList) {
            if (typeof descriptor === 'object' && 'url' in descriptor && descriptor.url) {
              result.links.push({
                href: descriptor.url.toString(),
                hrefLang: locale,
                rel: 'alternate',
                title: descriptor.title,
              });
            } else if (typeof descriptor === 'string' || descriptor instanceof URL) {
              result.links.push({
                href: descriptor.toString(),
                hrefLang: locale,
                rel: 'alternate',
              });
            }
          }
        }
      }
    }

    if (media) {
      for (const [mediaName, descriptors] of Object.entries(media)) {
        if (descriptors) {
          const descriptorList = Array.isArray(descriptors) ? descriptors : [descriptors];
          for (const descriptor of descriptorList) {
            if (typeof descriptor === 'object' && 'url' in descriptor && descriptor.url) {
              result.links.push({
                href: descriptor.url.toString(),
                media: mediaName,
                rel: 'alternate',
                title: descriptor.title,
              });
            } else if (typeof descriptor === 'string' || descriptor instanceof URL) {
              result.links.push({
                href: descriptor.toString(),
                media: mediaName,
                rel: 'alternate',
              });
            }
          }
        }
      }
    }

    if (types) {
      for (const [type, descriptors] of Object.entries(types)) {
        if (descriptors) {
          const descriptorList = Array.isArray(descriptors) ? descriptors : [descriptors];
          for (const descriptor of descriptorList) {
            if (typeof descriptor === 'object' && 'url' in descriptor && descriptor.url) {
              result.links.push({
                href: descriptor.url.toString(),
                rel: 'alternate',
                title: descriptor.title,
                type,
              });
            } else if (typeof descriptor === 'string' || descriptor instanceof URL) {
              result.links.push({
                href: descriptor.toString(),
                rel: 'alternate',
                type,
              });
            }
          }
        }
      }
    }
  }

  // --- iTunes ---
  if (metadata.itunes) {
    const { appArgument, appId } = metadata.itunes;
    let itunesContent = `app-id=${appId}`;
    if (appArgument) {
      itunesContent += `, app-argument=${appArgument}`;
    }
    result.metas.push({ content: itunesContent, name: 'apple-itunes-app' });
  }

  // --- Facebook ---
  if (metadata.facebook) {
    if (metadata.facebook.appId) {
      result.metas.push({ content: metadata.facebook.appId, property: 'fb:app_id' });
    }
    if (metadata.facebook.admins) {
      for (const admin of metadata.facebook.admins) {
        result.metas.push({ content: admin, property: 'fb:admins' });
      }
    }
  }

  // --- Pinterest ---
  if (metadata.pinterest && metadata.pinterest.richPin !== undefined) {
    result.metas.push({
      content: metadata.pinterest.richPin.toString(),
      property: 'pinterest-rich-pin',
    });
  }

  // --- Format Detection ---
  if (metadata.formatDetection) {
    const formatDetectionKeys = ['telephone', 'date', 'address', 'email', 'url'] as const;
    let formatContent = '';
    for (const key of formatDetectionKeys) {
      if (metadata.formatDetection[key] === false) {
        if (formatContent) formatContent += ', ';
        formatContent += `${key}=no`;
      }
    }
    if (formatContent) {
      result.metas.push({ content: formatContent, name: 'format-detection' });
    }
  }

  // --- Verification ---
  if (metadata.verification) {
    const verification = metadata.verification;

    if (verification.google) {
      for (const value of verification.google) {
        if (value != null && value !== '') {
          result.metas.push({ content: String(value), name: 'google-site-verification' });
        }
      }
    }
    if (verification.yahoo) {
      for (const value of verification.yahoo) {
        if (value != null && value !== '') {
          result.metas.push({ content: String(value), name: 'y_key' });
        }
      }
    }
    if (verification.yandex) {
      for (const value of verification.yandex) {
        if (value != null && value !== '') {
          result.metas.push({ content: String(value), name: 'yandex-verification' });
        }
      }
    }
    if (verification.me) {
      for (const value of verification.me) {
        if (value != null && value !== '') {
          result.metas.push({ content: String(value), name: 'me' });
        }
      }
    }
    if (verification.other) {
      for (const [name, values] of Object.entries(verification.other)) {
        for (const value of values) {
          if (value != null && value !== '') {
            result.metas.push({ content: String(value), name });
          }
        }
      }
    }
  }

  // --- Apple Web App ---
  if (metadata.appleWebApp) {
    if (typeof metadata.appleWebApp === 'boolean') {
      result.metas.push({ content: 'yes', name: 'mobile-web-app-capable' });
    } else {
      const { capable, startupImage, statusBarStyle, title } = metadata.appleWebApp;

      if (capable) {
        result.metas.push({ content: 'yes', name: 'mobile-web-app-capable' });
      }
      if (title) {
        result.metas.push({ content: title, name: 'apple-mobile-web-app-title' });
      }
      if (startupImage) {
        const images = Array.isArray(startupImage) ? startupImage : [startupImage];
        for (const image of images) {
          if (typeof image === 'string') {
            result.links.push({
              href: image,
              rel: 'apple-touch-startup-image',
            });
          } else {
            result.links.push({
              href: image.url,
              media: image.media,
              rel: 'apple-touch-startup-image',
            });
          }
        }
      }
      if (statusBarStyle) {
        result.metas.push({
          content: statusBarStyle,
          name: 'apple-mobile-web-app-status-bar-style',
        });
      }
    }
  }

  return result;
}
