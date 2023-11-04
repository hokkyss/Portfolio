import { Zodios } from '@zodios/core';

import envConfig from '~/_common/configs/env.config';

import experienceEndpoints from './endpoints/experiences.endpoint';

const apiEndpoint = new Zodios(envConfig.url, [...experienceEndpoints]);

export default apiEndpoint;
