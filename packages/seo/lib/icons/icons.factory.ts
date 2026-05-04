import { Icons } from './icons.interface';

/**
 * The icons for the document. Defaults to rel="icon".
 * @param icons
 * @returns Icons configuration
 * @remarks
 * You can specify a simple URL or an object to differentiate between icon types (e.g., apple-touch-icon).
 * @example
 * ```tsx
 * icons: "https://example.com/icon.png"
 * // or
 * icons: {
 *   icon: "https://example.com/icon.png",
 *   apple: "https://example.com/apple-icon.png"
 * }
 * ```
 * @see https://developer.mozilla.org/docs/Web/HTML/Attributes/rel#attr-icon
 */
export function defineIcons(icons: Icons) {
  return icons;
}
