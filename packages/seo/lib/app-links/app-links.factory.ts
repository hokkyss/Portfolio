import { AppLinks } from './app-links.interface';

/**
 * The Facebook AppLinks metadata for the document.
 * @param appLinks
 * @returns meta tags properties
 * @example
 * ```tsx
 * appLinks: {
 *   ios: { appStoreId: "123456789", url: "https://example.com" },
 *   android: { packageName: "com.example", url: "https://example.com" }
 * }
 *
 * // Renders
 * <meta property="al:ios:app_store_id" content="123456789" />
 * <meta property="al:ios:url" content="https://example.com" />
 * <meta property="al:android:package" content="com.example" />
 * <meta property="al:android:url" content="https://example.com" />
 * ```
 */
export function defineAppLinks(appLinks: AppLinks) {
  return appLinks;
}
