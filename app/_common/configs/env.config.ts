const envConfig = Object.freeze({
  __DEV__: process.env.NODE_ENV === 'development',
});

export default envConfig;
