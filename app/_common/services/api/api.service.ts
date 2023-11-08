import { Zodios } from '@zodios/core';

import envConfig from '~/_common/configs/env.config';

import experienceEndpoints from './endpoints/experiences.endpoint';
import projectEndpoints from './endpoints/projects.endpoint';
import skillEndpoint from './endpoints/skills.endpoint';

const apiService = new Zodios(envConfig.appUrl, [...skillEndpoint, ...experienceEndpoints, ...projectEndpoints]);

export default apiService;
