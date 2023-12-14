import { z } from 'zod';

import techSchema from '~/_common/models/tech.model';
import { revalidate } from '~/_server/configs/fetch.config';

import sanityClient from './cms.client';

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
          revalidate,
        },
      },
    ),
  );

export default getSkills;
