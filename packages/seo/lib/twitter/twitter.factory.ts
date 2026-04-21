import { Twitter } from './twitter.interface';

/**
 * The Twitter metadata for the document.
 * @param twitter twitter metadata configuration
 * @returns The twitter metadata configuration object.
 * @remarks
 * - Used for configuring Twitter Cards and can include details such as `card`, `site`, and `creator`.
 * - Notably, more sites than just Twitter (now X) use this format.
 * @example
 * ```tsx
 * twitter: {
 *   card: "summary_large_image",
 *   site: "@site",
 *   creator: "@creator",
 *   images: "https://example.com/og.png"
 * }
 * ```
 */
export function defineTwitter(twitter: Twitter) {
  return twitter;
}
