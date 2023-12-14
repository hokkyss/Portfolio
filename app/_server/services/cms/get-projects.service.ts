import { z } from 'zod';

import projectSchema from '~/_common/models/project.model';
import { revalidate } from '~/_server/configs/fetch.config';

import sanityClient from './cms.client';

const getProjects = async () =>
  z.array(projectSchema).parse(
    await sanityClient.fetch(
      `
* [_type == 'project'] | order(orderRank) {
  "id": _id,
  links,
  name,
  summary,
  "thumbnail": thumbnail.asset-> {
    "blurDataURL": metadata.lqip,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "aspectRatio": metadata.dimensions.aspectRatio,
    url,
    "filename": originalFilename
  },
  techStacks[] -> {
    "id": _id,
    name,
    icon
  },
  description
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

export default getProjects;
