import 'server-only';

import { createClient } from '@sanity/client';
import { z } from 'zod';

import envConfig from '~/_common/configs/env.config';
import experienceSchema from '~/_common/models/experience.model';
import projectSchema from '~/_common/models/project.model';
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
// #endregion

// #region Get Experiences
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

// #region Get Projects
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
          revalidate: envConfig.__DEV__ ? 0 : 3600,
        },
      },
    ),
  );
// #endregion

const cmsService = {
  getExperiences,
  getProjects,
  getSkills,
};

export default cmsService;
