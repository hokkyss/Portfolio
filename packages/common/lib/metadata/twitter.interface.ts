/**
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup Reference}
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/twitter-types.ts#L5 Source}
 */

export type Twitter
  = | TwitterApp
    | TwitterMetadata
    | TwitterPlayer
    | TwitterSummary
    | TwitterSummaryLargeImage;

export type TwitterAppDescriptor = {
  id: {
    googleplay?: string | undefined;
    ipad?: number | string | undefined;
    iphone?: number | string | undefined;
  };
  name?: string | undefined;
  url?:
    | {
      googleplay?: string | undefined | URL;
      ipad?: string | undefined | URL;
      iphone?: string | undefined | URL;
    }
    | undefined;
};

type TwitterApp = {
  app: TwitterAppDescriptor;
  card: 'app';
} & TwitterMetadata;

type TwitterImage = string | TwitterImageDescriptor | URL;

type TwitterImageDescriptor = {
  alt?: string | undefined;
  height?: number | string | undefined;
  secureUrl?: string | undefined | URL;
  type?: string | undefined;
  url: string | URL;
  width?: number | string | undefined;
};

type TwitterMetadata = {
  creator?: null | string | undefined; // username for the account associated to the creator of the content on the site
  creatorId?: null | string | undefined; // id for the account associated to the creator of the content on the site
  description?: null | string | undefined;
  images?: Array<TwitterImage> | TwitterImage | undefined;
  // defaults to card="summary"
  site?: null | string | undefined; // username for account associated to the site itself
  siteId?: null | string | undefined; // id for account associated to the site itself
  title?: string | undefined;
};

type TwitterPlayer = {
  card: 'player';
  players: Array<TwitterPlayerDescriptor> | TwitterPlayerDescriptor;
} & TwitterMetadata;

type TwitterPlayerDescriptor = {
  height: number;
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
};

type TwitterSummary = {
  card: 'summary';
} & TwitterMetadata;

type TwitterSummaryLargeImage = {
  card: 'summary_large_image';
} & TwitterMetadata;
