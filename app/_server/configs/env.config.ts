import 'server-only';

const serverEnvConfig = {
  cmsApiVersion: process.env.CMS_API_VERSION || '2023-11-07',
  cmsDataset: process.env.CMS_DATASET || '',
  cmsProjectId: process.env.CMS_PROJECT_ID || '',
  cmsToken: process.env.CMS_TOKEN || '',
} as const;

export default serverEnvConfig;
