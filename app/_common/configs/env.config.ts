const envConfig = Object.freeze({
  __DEV__:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development',
  url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/` : `http://localhost:${process.env.PORT || 3000}/`,
});

export default envConfig;
