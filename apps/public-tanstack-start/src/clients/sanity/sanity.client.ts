import ApplicationError from '@portfolio/common/errors/application-error';
import { createClient } from '@sanity/client';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getServerEnv } from '../../configs/env/env.config';

const getSanityClient = createIsomorphicFn()
  .client(() => {
    throw new ApplicationError(500, 'getSanityClient cannot be called from the client');
  })
  .server(() => {
    const serverEnv = getServerEnv();

    const sanityClient = createClient({
      apiVersion: serverEnv.cmsApiVersion,
      dataset: serverEnv.cmsDataset,
      perspective: 'published',
      projectId: serverEnv.cmsProjectId,
      token: serverEnv.cmsToken,
      useCdn: import.meta.env.DEV ? false : true,
    });

    return sanityClient;
  });

export default getSanityClient;
