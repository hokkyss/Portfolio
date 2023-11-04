import 'server-only';

const serverEnvConfig = Object.freeze({
  url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/` : `http://localhost:${process.env.PORT || 3000}/`,
});

export default serverEnvConfig;
