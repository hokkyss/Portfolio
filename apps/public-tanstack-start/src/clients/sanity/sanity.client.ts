import '@tanstack/react-start/server-only';

import { createClient } from '@sanity/client';
import { getServerEnv } from '../../configs/env/env.config';

const serverEnv = getServerEnv();

const sanityClient = createClient({
  apiVersion: serverEnv.cmsApiVersion,
  dataset: serverEnv.cmsDataset,
  perspective: 'published',
  projectId: serverEnv.cmsProjectId,
  token: serverEnv.cmsToken,
  useCdn: import.meta.env.DEV ? false : true,
});

export default sanityClient;
