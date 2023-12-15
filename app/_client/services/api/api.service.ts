import { Zodios } from '@zodios/core';

import experienceEndpoints from './endpoints/experiences.endpoint';
import projectEndpoints from './endpoints/projects.endpoint';
import skillEndpoint from './endpoints/skills.endpoint';

const apiService = new Zodios(new URL('api', origin).toString(), [
  ...skillEndpoint,
  ...experienceEndpoints,
  ...projectEndpoints,
]);

export default apiService;
