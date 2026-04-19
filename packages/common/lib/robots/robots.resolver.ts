import { Robots } from './robots.interface';

/**
 * Create a robots.txt file content from Robots configuration defined using `defineRobots`
 * @param data - Robots configuration defined using `defineRobots`
 * @returns robots.txt file content
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/build/webpack/loaders/metadata/resolve-route-data.ts#L5}
 */
export function resolveRobots(data: Robots) {
  let content = '';
  const rules = Array.isArray(data.rules) ? data.rules : [data.rules];
  for (const rule of rules) {
    const userAgent = resolveArray(rule.userAgent || ['*']);
    for (const agent of userAgent) {
      content += `User-Agent: ${agent}\n`;
    }
    if (rule.allow) {
      const allow = resolveArray(rule.allow);
      for (const item of allow) {
        content += `Allow: ${item}\n`;
      }
    }
    if (rule.disallow) {
      const disallow = resolveArray(rule.disallow);
      for (const item of disallow) {
        content += `Disallow: ${item}\n`;
      }
    }
    if (rule.crawlDelay) {
      content += `Crawl-delay: ${rule.crawlDelay}\n`;
    }
    content += '\n';
  }
  if (data.host) {
    content += `Host: ${data.host}\n`;
  }
  if (data.sitemap) {
    const sitemap = resolveArray(data.sitemap);
    // TODO-METADATA: support injecting sitemap url into robots.txt
    sitemap.forEach((item) => {
      content += `Sitemap: ${item}\n`;
    });
  }

  return content;
}

/**
 * If `value` is array, return it. Otherwise, return array with `value` as single element.
 * @param value - Value to resolve
 * @returns Array with `value` as single element if `value` is not array, otherwise return `value`
 */
function resolveArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
