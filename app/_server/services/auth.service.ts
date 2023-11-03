import 'server-only';

import { Zodios, apiBuilder, parametersBuilder } from '@zodios/core';
import { cache } from 'react';
import { z } from 'zod';

import serverEnvConfig from '~/_server/configs/env.config';

const endpoints = new Zodios(
  serverEnvConfig.apiBaseUrl,
  apiBuilder()
    .addEndpoint({
      alias: 'signIn',
      method: 'post',
      parameters: parametersBuilder()
        .addBody(z.object({ email: z.string(), password: z.string() }))
        .build(),
      path: '/v1/auth/login',
      response: z
        .object({
          token: z.string(),
        })
        .transform(({ token }) => token),
    })
    .build(),
);

export default class AuthService {
  public static signIn = cache(async (email: string, password: string) => {
    return await endpoints.signIn({ email, password });
  });
}
