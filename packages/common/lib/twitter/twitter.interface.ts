/**
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup Reference}
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/twitter-types.ts#L5 Source}
 */

export type Twitter
  = | TwitterApp
    | TwitterPlayer
    | TwitterSummary
    | TwitterSummaryLargeImage;

export type TwitterAppDescriptor = {
  id: {
    googleplay?: string;
    ipad?: number | string;
    iphone?: number | string;
  };
  name?: string;
  url?: {
    googleplay?: string | URL;
    ipad?: string | URL;
    iphone?: string | URL;
  };
};

type TwitterApp = {
  app: TwitterAppDescriptor;
  card: 'app';
} & TwitterMetadata;

type TwitterImage = string | TwitterImageDescriptor | URL;

type TwitterImageDescriptor = {
  alt?: string;
  height?: number | string;
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
  width?: number | string;
};

/**
 * Defaults to card="summary"
 */
type TwitterMetadata = {
  /**
   * username for the account associated to the creator of the content on the site
   */
  creator?: string;
  /**
   * id for the account associated to the creator of the content on the site
   */
  creatorId?: string;
  description?: string;
  images?: Array<TwitterImage>;
  /**
   * username for account associated to the site itself
   */
  site?: string;
  /**
   * id for account associated to the site itself
   */
  siteId?: string;
  title?: string;
};

type TwitterPlayer = {
  card: 'player';
  players: Array<TwitterPlayerDescriptor>;
} & TwitterMetadata;

type TwitterPlayerDescriptor = {
  height: number;
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
};

type TwitterSummary = {
  card?: 'summary';
} & TwitterMetadata;

type TwitterSummaryLargeImage = {
  card: 'summary_large_image';
} & TwitterMetadata;
