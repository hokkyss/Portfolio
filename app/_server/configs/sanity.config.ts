import 'server-only';

import type { ClientConfig } from '@sanity/client';

import envConfig from '~/_common/configs/env.config';

import serverEnvConfig from './env.config';

const sanityConfig: ClientConfig = {
  apiVersion: serverEnvConfig.cmsApiVersion,
  dataset: serverEnvConfig.cmsDataset,
  perspective: envConfig.__DEV__ ? 'previewDrafts' : 'published',
  projectId: serverEnvConfig.cmsProjectId,
  useCdn: envConfig.__DEV__ ? false : true,
};

export default sanityConfig;
