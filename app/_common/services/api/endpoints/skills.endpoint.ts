import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

import techSchema from '~/_common/models/tech.model';

const skillEndpoint = apiBuilder()
  .addEndpoint({
    alias: 'getSkills',
    immutable: true,
    method: 'get',
    path: '/api/skills',
    response: z.array(techSchema),
    status: 200,
  })
  .build();

export default skillEndpoint;
