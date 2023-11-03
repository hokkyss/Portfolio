import 'server-only';

const serverEnvConfig = Object.freeze({
  apiBaseUrl: process.env.API_BASE_URL,
  apiUserEmail: process.env.API_USER_EMAIL,
  apiUserPassword: process.env.API_USER_PASSWORD,
});

export default serverEnvConfig;
