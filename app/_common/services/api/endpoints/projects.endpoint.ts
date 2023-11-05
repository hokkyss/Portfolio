import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

import projectSchema from '~/_common/models/project.model';

const projectEndpoints = apiBuilder()
  .addEndpoint({
    alias: 'getProjects',
    immutable: true,
    method: 'get',
    path: '/projects',
    response: z.array(projectSchema),
  })
  .build();

export default projectEndpoints;
