const envConfig = Object.freeze({
  __DEV__:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development',
});

export default envConfig;
