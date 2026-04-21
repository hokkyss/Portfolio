import { DetailedHTMLProps, MetaHTMLAttributes } from 'react';
import type { Viewport } from './viewport.interface';

/**
 * Convert viewport data to meta tags
 * @param viewport - Viewport configuration defined using `defineViewport`
 * @returns Array of meta tags property
 */
export function resolveViewport(viewport: Viewport): DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] {
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

  const finalResult: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] = [];

  if (viewport.colorScheme) {
    finalResult.push({
      content: viewport.colorScheme,
      name: 'color-scheme',
    });
  }
  themeColors.forEach((themeColor) => {
    finalResult.push({
      content: themeColor.content,
      media: themeColor.media,
      name: 'theme-color',
    });
  });

  finalResult.push({
    content: viewportParts.join(', '),
    name: 'viewport',
  });

  return finalResult;
}
