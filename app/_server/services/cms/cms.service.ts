import 'server-only';

import { createClient } from '@sanity/client';
import { z } from 'zod';

import envConfig from '~/_common/configs/env.config';
import techSchema from '~/_common/models/tech.model';

import serverEnvConfig from '../../configs/env.config';

const sanityClient = createClient({
  apiVersion: serverEnvConfig.cmsApiVersion,
  dataset: serverEnvConfig.cmsDataset,
  perspective: envConfig.__DEV__ ? 'previewDrafts' : 'published',
  projectId: serverEnvConfig.cmsProjectId,
  useCdn: envConfig.__DEV__ ? false : true,
});

// #region Get Skills
const getSkills = async () =>
  z.array(techSchema).parse(
    await sanityClient.fetch(
      `
*[_type == "tech"] | order(orderRank) {
  "id": _id,
  name,
  "techStacks": techStacks[]->{
    "id": _id,
    name,
    icon
  }
}`,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['tech'],
        },
      },
    ),
  );
// #endregion

const cmsService = {
  getSkills,
};

export default cmsService;
