import 'client-only';

import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import envConfig from '~/_common/configs/env.config';
import apiEndpoints from '~/_common/services/api/api.service';

// Make request to this app's backend (on the same origin)
const apiEndpoint = new Zodios(new URL('/api', envConfig.appUrl).toString(), apiEndpoints);

const apiService = new ZodiosHooks('api', apiEndpoint);

export default apiService;
