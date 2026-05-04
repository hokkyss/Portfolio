import type { SeoMetadata } from '../types';
import type { Viewport } from './viewport.interface';

/**
 * Convert viewport data to meta tags
 * @param viewport - Viewport configuration defined using `defineViewport`
 * @returns Array of meta tags property
 */
export function resolveViewport(viewport: Viewport): SeoMetadata {
  const finalResult: SeoMetadata = {
    links: [],
    metas: [],
  };

  // Build viewport content string properties
  const viewportParts: string[] = [];
  if (viewport.width != null) {
    viewportParts.push(`width=${viewport.width}`);
  }
  if (viewport.height != null) {
    viewportParts.push(`height=${viewport.height}`);
  }
  if (viewport.initialScale != null) {
    viewportParts.push(`initial-scale=${viewport.initialScale}`);
  }
  if (viewport.minimumScale != null) {
    viewportParts.push(`minimum-scale=${viewport.minimumScale}`);
  }
  if (viewport.maximumScale != null) {
    viewportParts.push(`maximum-scale=${viewport.maximumScale}`);
  }
  if (viewport.userScalable != null) {
    viewportParts.push(`user-scalable=${viewport.userScalable ? 'yes' : 'no'}`);
  }
  if (viewport.viewportFit) {
    viewportParts.push(`viewport-fit=${viewport.viewportFit}`);
  }
  if (viewport.interactiveWidget) {
    viewportParts.push(`interactive-widget=${viewport.interactiveWidget}`);
  }
  finalResult.metas.push({
    content: viewportParts.join(', '),
    name: 'viewport',
  });

  if (viewport.colorScheme) {
    finalResult.metas.push({
      content: viewport.colorScheme,
      name: 'color-scheme',
    });
  }

  const themeColors: Array<{ content: string; media?: string }> = [];
  if (viewport.themeColor) {
    if (typeof viewport.themeColor === 'string') {
      themeColors.push({
        content: viewport.themeColor,
      });
    } else if (Array.isArray(viewport.themeColor)) {
      for (const themeColor of viewport.themeColor) {
        themeColors.push({
          content: themeColor.color,
          media: themeColor.media,
        });
      }
    } else {
      themeColors.push({
        content: viewport.themeColor.color,
        media: viewport.themeColor.media,
      });
    }
  }

  themeColors.forEach((themeColor) => {
    finalResult.metas.push({
      content: themeColor.content,
      media: themeColor.media,
      name: 'theme-color',
    });
  });

  return finalResult;
}
