import 'server-only';

import { Zodios } from '@zodios/core';

import experienceEndpoints from '~/_common/services/api/endpoints/experiences.endpoint';

import serverEnvConfig from '../configs/env.config';

// TODO: Add CMS
const apiService = new Zodios(serverEnvConfig.cmsUrl, [...experienceEndpoints]);

export default apiService;
