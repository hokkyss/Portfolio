const envConfig = {
  __DEV__:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
    process.env.VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development',
  appUrl: (function () {
    if (process.env.NEXT_PUBLIC_DOMAIN) {
      return `https://${process.env.NEXT_PUBLIC_DOMAIN}/`;
    }

    if (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL) {
      return `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}/`;
    }

    return `http://localhost:${process.env.PORT || 3000}/`;
  })(),
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
} as const;

export default envConfig;
