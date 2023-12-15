import { z } from 'zod';

import experienceSchema from '~/_common/models/experience.model';
import { revalidate } from '~/_server/configs/fetch.config';

import sanityClient from './cms.client';

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
          revalidate,
        },
      },
    ),
  );

export default getExperiences;
