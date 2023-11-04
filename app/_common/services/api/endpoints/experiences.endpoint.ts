import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

import experienceSchema from '~/_common/models/experience.model';

const experienceEndpoints = apiBuilder()
  .addEndpoint({
    alias: 'getExperiences',
    immutable: true,
    method: 'get',
    path: '/api/experiences',
    response: z.array(experienceSchema),
  })
  .build();

export default experienceEndpoints;
