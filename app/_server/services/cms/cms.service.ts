import 'server-only';

import { createClient } from '@sanity/client';
import { z } from 'zod';

import envConfig from '~/_common/configs/env.config';
import experienceSchema from '~/_common/models/experience.model';
import techSchema from '~/_common/models/tech.model';
import sanityConfig from '~/_server/configs/sanity.config';

const sanityClient = createClient(sanityConfig);

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
          revalidate: envConfig.__DEV__ ? 0 : 3600,
        },
      },
    ),
  );

const getExperiences = async () =>
  z.array(experienceSchema).parse(
    await sanityClient.fetch(
      `
* [_type == "experience"] | order(to desc, orderRank) {
  "id": _id,
  description,
  from,
  to,
  role,
  company -> {
    "id": _id,
    name,
    link
  },
  techStacks[] -> {
    "id": _id,
    name,
    icon
  }
}
`,
      {},
      {
        next: {
          revalidate: envConfig.__DEV__ ? 0 : 3600,
        },
      },
    ),
  );
// #endregion

const cmsService = {
  getExperiences,
  getSkills,
};

export default cmsService;
