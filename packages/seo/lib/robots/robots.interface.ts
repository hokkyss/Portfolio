/**
 * @see {@link https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/types/metadata-interface.ts#L677 Source}
 */
export type Robots = {
  host?: string;
  rules:
    | {
      allow?: string | string[];
      crawlDelay?: number;
      disallow?: string | string[];
      userAgent?: string | string[];
    }
    | Array<{
      allow?: string | string[];
      crawlDelay?: number;
      disallow?: string | string[];
      userAgent: string | string[];
    }>;
  sitemap?: string | string[];
};
