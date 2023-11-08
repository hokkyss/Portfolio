const envConfig = Object.freeze({
  __DEV__:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
    process.env.VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development',
  appUrl:
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}/`
      : `http://localhost:${process.env.PORT || 3000}/`,
});

export default envConfig;
