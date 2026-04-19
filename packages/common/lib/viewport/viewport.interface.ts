/**
 * Viewport meta structure
 * Intentionally leaving out user-scalable, use a string if you want that behavior
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag Reference}
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/extra-types.ts#L56 Viewport}
 */
export type Viewport = {
  /**
   * The color scheme for the document.
   * @example
   * ```tsx
   * colorScheme: "dark"
   * // Renders <meta name="color-scheme" content="dark" />
   * ```
   */
  colorScheme?: ColorSchemeEnum | null | undefined;
  height?: number | string | undefined;
  initialScale?: number | undefined;
  interactiveWidget?:
    | 'overlays-content'
    | 'resizes-content'
    | 'resizes-visual'
    | undefined;
  maximumScale?: number | undefined;
  minimumScale?: number | undefined;
  /**
   * The theme color for the document.
   * @example
   * ```tsx
   * themeColor: "#000000"
   * // Renders <meta name="theme-color" content="#000000" />
   *
   * themeColor: { media: "(prefers-color-scheme: dark)", color: "#000000" }
   * // Renders <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
   *
   * themeColor: [
   *  { media: "(prefers-color-scheme: dark)", color: "#000000" },
   *  { media: "(prefers-color-scheme: light)", color: "#ffffff" }
   * ]
   * // Renders <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
   * // Renders <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
   * ```
   */
  themeColor?:
    | null
    | string
    | ThemeColorDescriptor
    | ThemeColorDescriptor[]
    | undefined;
  userScalable?: boolean | undefined;
  viewportFit?: 'auto' | 'contain' | 'cover' | undefined;

  width?: number | string | undefined;
};

type ColorSchemeEnum
  = | 'dark'
    | 'dark light'
    | 'light'
    | 'light dark'
    | 'normal'
    | 'only light';

type ThemeColorDescriptor = {
  color: string;
  media?: string | undefined;
};
