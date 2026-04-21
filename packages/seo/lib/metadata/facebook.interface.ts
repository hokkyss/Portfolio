/**
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/extra-types.ts#L95 Source}
 */
export type Facebook = FacebookAdmins | FacebookAppId;

export type FacebookAdmins = {
  admins: string | string[];
  appId?: never;
};

export type FacebookAppId = {
  admins?: never;
  appId: string;
};
