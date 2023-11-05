import 'server-only';

const serverEnvConfig = Object.freeze({
  // TODO: Add CMS
  cmsUrl: process.env.CMS_URL || '',
});

export default serverEnvConfig;
