import 'server-only';

const serverEnvConfig = Object.freeze({
  cmsApiVersion: process.env.CMS_API_VERSION || '2023-11-07',
  cmsDataset: process.env.CMS_DATASET || '',
  cmsProjectId: process.env.CMS_PROJECT_ID || '',
});

export default serverEnvConfig;
