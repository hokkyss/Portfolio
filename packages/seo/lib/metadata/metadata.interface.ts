import { SitemapLanguages } from '../sitemap/sitemap.interface';
import { Facebook } from './facebook.interface';
import { Pinterest } from './pinterest.interface';

/**
 * Metadata interface to describe all the metadata fields that can be set in a document.
 * @remarks
 * This interface covers all the metadata fields available in Next.js including title, description,
 * icons, twitter, and more. Fields such as `metadataBase` help in composing absolute URLs
 * from relative ones.
 * @example
 * ```tsx
 * // Static metadata export in a layout or page:
 * import type { Metadata } from 'next'
 *
 * export const metadata: Metadata = {
 *   metadataBase: new URL('https://example.com'),
 *   title: { default: 'My Site', template: '%s | My Site' },
 *   description: 'Welcome to My Site',
 *   alternates: {
 *     canonical: 'https://example.com',
 *     languages: {
 *       'en-US': 'https://example.com/en-US',
 *       'de-DE': 'https://example.com/de-DE'
 *     }
 *   },
 * }
 * ```
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/metadata-interface.ts#L90C1-L123C6 Source}
 */
export type Metadata = {
  /**
   * A brief description of the web page.
   * @remarks
   * Rendered as the `abstract` meta tag. This is *not recommended* as it is superseded by `description`.
   * @example
   * ```tsx
   * abstract: "My Website Description"
   * // Renders <meta name="abstract" content="My Website Description" />
   * ```
   */
  abstract?: string;

  /**
   * The canonical and alternate URLs for the document.
   * @remarks
   * This field allows defining a canonical URL as well as alternate URLs (such as for multiple languages).
   * @example
   * ```tsx
   * alternates: {
   *   canonical: "https://example.com",
   *   languages: {
   *     "en-US": "https://example.com/en-US"
   *   }
   * }
   * ```
   */
  alternates?: AlternateURLs;

  /**
   * The Apple web app metadata for the document.
   * @example
   * ```tsx
   * appleWebApp: { capable: true, title: "My Website", statusBarStyle: "black-translucent" }
   * ```
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
   */
  appleWebApp?: AppleWebApp | boolean;

  // Standard metadata names
  // https://developer.mozilla.org/docs/Web/HTML/Element/meta/name

  /**
   * The application name.
   * @example
   * ```tsx
   * applicationName: "My Blog"
   * // Renders: <meta name="application-name" content="My Blog" />
   * ```
   */
  applicationName?: string;

  /**
   * The Facebook AppLinks metadata for the document.
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
  appLinks?: AppLinks;

  /**
   * The archives link rel property.
   * @example
   * ```tsx
   * archives: "https://example.com/archives"
   * // Renders <link rel="archives" href="https://example.com/archives" />
   * ```
   */
  archives?: Array<string> | string;

  /**
   * The assets link rel property.
   * @example
   * ```tsx
   * assets: "https://example.com/assets"
   * // Renders <link rel="assets" href="https://example.com/assets" />
   * ```
   */
  assets?: Array<string> | string;

  /**
   * The authors of the document.
   * @example
   * ```tsx
   * authors: [{ name: "Next.js Team", url: "https://nextjs.org" }]
   * // Renders:
   * // <meta name="author" content="Next.js Team" />
   * // <link rel="author" href="https://nextjs.org" />
   * ```
   */
  authors?: Array<Author> | Author;

  /**
   * The bookmarks link rel property.
   * @remarks
   * Although technically against the HTML spec, this is used in practice.
   * @example
   * ```tsx
   * bookmarks: "https://example.com/bookmarks"
   * // Renders <link rel="bookmarks" href="https://example.com/bookmarks" />
   * ```
   */
  bookmarks?: Array<string> | string;

  /**
   * The category meta name property.
   * @example
   * ```tsx
   * category: "My Category"
   * // Renders <meta name="category" content="My Category" />
   * ```
   */
  category?: string;

  /**
   * The classification meta name property.
   * @example
   * ```tsx
   * classification: "My Classification"
   * // Renders <meta name="classification" content="My Classification" />
   * ```
   */
  classification?: string;
  /**
   * The creator of the document.
   * @example
   * ```tsx
   * creator: "Next.js Team"
   * // Renders: <meta name="creator" content="Next.js Team" />
   * ```
   */
  creator?: string;

  // https://developer.mozilla.org/docs/Web/HTML/Element/meta/name#other_metadata_names

  /**
   * The document description, and optionally the Open Graph and Twitter descriptions.
   * @example
   * ```tsx
   * description: "My Blog Description"
   * // Renders: <meta name="description" content="My Blog Description" />
   * ```
   */
  description?: string;

  /**
   * The Facebook metadata for the document.
   * @remarks
   * Specify either `appId` or `admins` (but not both) to configure Facebook integration.
   * @example
   * ```tsx
   * facebook: { appId: "12345678" }
   * // Renders <meta property="fb:app_id" content="12345678" />
   * // or
   * facebook: { admins: ["12345678"] }
   * // Renders <meta property="fb:admins" content="12345678" />
   * ```
   */
  facebook?: Facebook;

  /**
   * Indicates whether devices should interpret certain formats (such as telephone numbers) as actionable links.
   * @example
   * ```tsx
   * formatDetection: { telephone: false }
   * // Renders: <meta name="format-detection" content="telephone=no" />
   * ```
   */
  formatDetection?: FormatDetection;

  /**
   * The generator used for the document.
   * @example
   * ```tsx
   * generator: "Next.js"
   * // Renders: <meta name="generator" content="Next.js" />
   * ```
   */
  generator?: string;

  /**
   * The icons for the document. Defaults to rel="icon".
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
  icons?: Array<Icon> | Icons | IconURL;

  /**
   * The metadata for the iTunes App.
   * @remarks
   * Adds the `name="apple-itunes-app"` meta tag.
   * @example
   * ```tsx
   * itunes: { app: { id: "123456789", affiliateData: "123456789", appArguments: "123456789" } }
   * // Renders <meta name="apple-itunes-app" content="app-id=123456789, affiliate-data=123456789, app-arguments=123456789" />
   * ```
   */
  itunes?: ItunesApp;

  /**
   * The keywords for the document.
   * @remarks
   * When an array is provided, keywords are flattened into a comma-separated string.
   * @example
   * ```tsx
   * keywords: "nextjs, react, blog"
   * // or
   * keywords: ["react", "server components"]
   * ```
   */
  keywords?: Array<string> | string;

  /**
   * A web application manifest, as defined in the Web Application Manifest specification.
   * @example
   * ```tsx
   * manifest: "https://example.com/manifest.json"
   * // Renders: <link rel="manifest" href="https://example.com/manifest.json" />
   * ```
   * @see https://developer.mozilla.org/docs/Web/Manifest
   */
  manifest?: string | undefined | URL;

  /**
   * The base path and origin for absolute URLs in various metadata fields.
   * @remarks
   * When relative URLs (for Open Graph images, alternates, etc.) are used, they are composed with this base.
   * If not provided, Next.js will populate a default value based on environment variables.
   */
  metadataBase?: string | undefined | URL;
  /**
   * Arbitrary name/value pairs for additional metadata.
   * @remarks
   * Use this field to define custom meta tags that are not directly supported.
   * @example
   * ```tsx
   * other: { custom: ["meta1", "meta2"] }
   * ```
   */
  other?:
    | {
      [name: string]: Array<number | string> | number | string;
    };

  /**
   * The pagination link rel properties.
   * @example
   * ```tsx
   * pagination: {
   *   previous: "https://example.com/items?page=1",
   *   next: "https://example.com/items?page=3"
   * }
   *
   * // Renders
   * <link rel="prev" href="https://example.com/items?page=1" />
   * <link rel="next" href="https://example.com/items?page=3" />
   * ```
   * @see https://developers.google.com/search/blog/2011/09/pagination-with-relnext-and-relprev
   */
  pagination?: {
    next?: string | undefined | URL;
    previous?: string | undefined | URL;
  };

  /**
   * The Pinterest metadata for the document to choose whether opt out of rich pin data.
   * @example
   * ```tsx
   * pinterest: { richPin: true }
   * // Renders <meta name="pinterest-rich-pin" content="true" />
   * ```
   */
  pinterest?: Pinterest;
  /**
   * The publisher of the document.
   * @example
   * ```tsx
   * publisher: "Vercel"
   * // Renders: <meta name="publisher" content="Vercel" />
   * ```
   */
  publisher?: string;
  /**
   * The referrer setting for the document.
   * @example
   * ```tsx
   * referrer: "origin"
   * // Renders: <meta name="referrer" content="origin" />
   * ```
   */
  referrer?: ReferrerEnum;
  /**
   * The document title.
   * @remarks
   * The title can be a simple string (e.g., `"My Blog"`) or an object with:
   * - `default`: A fallback title for child segments.
   * - `template`: A title template (e.g., `"%s | My Website"`) applied to child titles.
   * - `absolute`: A title that overrides parent templates.
   * @example
   * ```tsx
   * // As a simple string:
   * title: "My Blog"
   *
   * // As a template object:
   * title: { default: "Dashboard", template: "%s | My Website" }
   * ```
   */
  title?: string;
  /**
   * The common verification tokens for the document.
   * @example
   * ```tsx
   * verification: { google: "1234567890", yandex: "1234567890", "me": "1234567890" }
   * // Renders <meta name="google-site-verification" content="1234567890" />
   * // <meta name="yandex-verification" content="1234567890" />
   * // <meta name="me" content="@me" />
   * ```
   */
  verification?: undefined | Verification;
};

type AlternateLinkDescriptor = {
  title?: string;
  url: string | URL;
};

type AlternateURLs = {
  canonical?: AlternateLinkDescriptor | string | undefined | URL;
  languages?:
    | SitemapLanguages<AlternateLinkDescriptor[] | string | URL>;

  media?:
    | {
      [media: string]: AlternateLinkDescriptor[] | string | URL;
    };

  types?:
    | {
      [types: string]: AlternateLinkDescriptor[] | string | URL;
    };

};

type AppleImage = AppleImageDescriptor | string;

type AppleImageDescriptor = {
  media?: string;
  url: string;
};

type AppleWebApp = {
  // default true
  capable?: boolean;
  startupImage?: AppleImage | Array<AppleImage>;
  // default "default"
  statusBarStyle?: 'black-translucent' | 'black' | 'default';
  title?: string;
};

type AppLinks = {
  android?: AppLinksAndroid | Array<AppLinksAndroid>;
  ios?: AppLinksApple | Array<AppLinksApple>;
  ipad?: AppLinksApple | Array<AppLinksApple>;
  iphone?: AppLinksApple | Array<AppLinksApple>;
  web?: AppLinksWeb | Array<AppLinksWeb>;
  windows?: AppLinksWindows | Array<AppLinksWindows>;
  windows_phone?: AppLinksWindows | Array<AppLinksWindows>;
  windows_universal?: AppLinksWindows | Array<AppLinksWindows>;
};
type AppLinksAndroid = {
  app_name?: string;
  class?: string;
  package: string;
  url?: string | undefined | URL;
};
type AppLinksApple = {
  app_name?: string;
  app_store_id?: number | string;
  url: string | URL;
};

type AppLinksWeb = {
  should_fallback?: boolean;
  url: string | URL;
};

type AppLinksWindows = {
  app_id?: string;
  app_name?: string;
  url: string | URL;
};

type Author = {
  // renders as <meta name="author"...
  name?: string;
  // renders as <link rel="author"...
  url?: string | undefined | URL;
};

type FormatDetection = {
  address?: boolean;
  date?: boolean;
  email?: boolean;
  telephone?: boolean;
  url?: boolean;
};

type Icon = IconDescriptor | IconURL;

type IconDescriptor = {
  color?: string;
  /**
   * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority
   */
  fetchPriority?: 'auto' | 'high' | 'low';
  media?: string;
  /** defaults to rel="icon" unless superseded by Icons map */
  rel?: string;
  sizes?: string;
  type?: string;
  url: string | URL;
};

type Icons = {
  /**
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
   * rel="apple-touch-icon"
   */
  apple?: Icon | Icon[];
  /** rel="icon" */
  icon?: Icon | Icon[];
  /** rel inferred from descriptor, defaults to "icon" */
  other?: IconDescriptor | IconDescriptor[];
  /** rel="shortcut icon" */
  shortcut?: Icon | Icon[];
};

type IconURL = string | URL;

/**
 * @see {@link https://developer.apple.com/documentation/webkit/promoting_apps_with_smart_app_banners Reference}
 */
type ItunesApp = {
  appArgument?: string;
  appId: string;
};

/**
 * does not include "unsafe-URL". to use this users should use '"unsafe-URL" as ReferrerEnum'
 */
type ReferrerEnum
  = | 'no-referrer-when-downgrade'
    | 'no-referrer'
    | 'origin-when-cross-origin'
    | 'origin'
    | 'same-origin'
    | 'strict-origin-when-cross-origin'
    | 'strict-origin';

type Verification = {
  google?: (number | string)[] | number | string;
  me?: (number | string)[] | number | string;
  // if you ad-hoc additional verification
  other?:
    | {
      [name: string]: (number | string)[] | number | string;
    };

  yahoo?: (number | string)[] | number | string;
  yandex?: (number | string)[] | number | string;
};
