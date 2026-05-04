import type { Sitemap } from './sitemap.interface';

/**
 * Convert sitemap data to XML string
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/build/webpack/loaders/metadata/resolve-route-data.ts#L46 Next.js source code}
 * @param data - Sitemap configuration defined using `defineSitemap`
 * @returns sitemap.xml file content
 * @todo support multi sitemap files
 */
export function resolveSitemap(data: Sitemap): string {
  const hasAlternates = data.some(
    (item) => Object.keys(item.alternates ?? {}).length > 0,
  );
  const hasImages = data.some((item) => Boolean(item.images?.length));
  const hasVideos = data.some((item) => Boolean(item.videos?.length));

  let content = '';
  content += '<?xml version="1.0" encoding="UTF-8"?>\n';
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  if (hasImages) {
    content += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  }
  if (hasVideos) {
    content += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';
  }
  if (hasAlternates) {
    content += ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  } else {
    content += '>\n';
  }
  for (const item of data) {
    content += '<url>\n';
    content += `<loc>${item.url}</loc>\n`;

    const languages = item.alternates?.languages;
    if (languages && Object.keys(languages).length) {
      // Since sitemap is separated from the page rendering, there's not metadataBase accessible yet.
      // we give the default setting that won't effect the languages resolving.
      for (const language in languages) {
        content += `<xhtml:link rel="alternate" hreflang="${language}" href="${
          languages[language as keyof typeof languages]
        }" />\n`;
      }
    }
    if (item.images?.length) {
      for (const image of item.images) {
        content += `<image:image>\n<image:loc>${image}</image:loc>\n</image:image>\n`;
      }
    }
    if (item.videos?.length) {
      for (const video of item.videos) {
        const videoFields = [
          `<video:video>`,
          `<video:title>${video.title}</video:title>`,
          `<video:thumbnail_loc>${video.thumbnail_loc}</video:thumbnail_loc>`,
          `<video:description>${video.description}</video:description>`,
          video.content_loc
          && `<video:content_loc>${video.content_loc}</video:content_loc>`,
          video.player_loc
          && `<video:player_loc>${video.player_loc}</video:player_loc>`,
          video.duration
          && `<video:duration>${video.duration}</video:duration>`,
          video.view_count
          && `<video:view_count>${video.view_count}</video:view_count>`,
          video.tag && `<video:tag>${video.tag}</video:tag>`,
          video.rating && `<video:rating>${video.rating}</video:rating>`,
          video.expiration_date
          // Next.js implementation
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          && `<video:expiration_date>${video.expiration_date}</video:expiration_date>`,
          video.publication_date
          // Next.js implementation
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          && `<video:publication_date>${video.publication_date}</video:publication_date>`,
          video.family_friendly
          && `<video:family_friendly>${video.family_friendly}</video:family_friendly>`,
          video.requires_subscription
          && `<video:requires_subscription>${video.requires_subscription}</video:requires_subscription>`,
          video.live && `<video:live>${video.live}</video:live>`,
          video.restriction
          && `<video:restriction relationship="${video.restriction.relationship}">${video.restriction.content}</video:restriction>`,
          video.platform
          && `<video:platform relationship="${video.platform.relationship}">${video.platform.content}</video:platform>`,
          video.uploader
          && `<video:uploader${video.uploader.info && ` info="${video.uploader.info}"`}>${video.uploader.content}</video:uploader>`,
          `</video:video>\n`,
        ].filter(Boolean);
        content += videoFields.join('\n');
      }
    }
    if (item.lastModified) {
      const serializedDate
        = item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified;

      content += `<lastmod>${serializedDate}</lastmod>\n`;
    }

    if (item.changeFrequency) {
      content += `<changefreq>${item.changeFrequency}</changefreq>\n`;
    }

    if (typeof item.priority === 'number') {
      content += `<priority>${item.priority}</priority>\n`;
    }

    content += '</url>\n';
  }

  content += '</urlset>\n';

  return content;
}
