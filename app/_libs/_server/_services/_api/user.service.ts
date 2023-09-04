import { Zodios, apiBuilder } from '@zodios/core';
import { pluginToken } from '@zodios/plugins';
import { cache } from 'react';
import { z } from 'zod';

import serverEnvConfig from '~/_server/_configs/_env/env.config';

import AuthService from './auth.service';

const endpoints = new Zodios(
  serverEnvConfig.apiBaseUrl,
  apiBuilder()
    .addEndpoint({
      alias: 'getSkills',
      method: 'get',
      path: '/v1/user/skills',
      response: z.any(),
    })
    .build(),
);

endpoints.use(
  pluginToken({
    getToken: async () => await AuthService.signIn(serverEnvConfig.apiUserEmail, serverEnvConfig.apiUserPassword),
  }),
);

export default class UserService {
  public static getSkills = cache(() => endpoints.getSkills());
}
