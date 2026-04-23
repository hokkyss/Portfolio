import ApplicationError from '@portfolio/common/errors/application-error';
import { createIsomorphicFn } from '@tanstack/react-start';
import { z } from 'zod/v4';

export const getClientEnv = createIsomorphicFn()
  .client(() => {
    const clientEnvSchema = z
      .object({
        environment: z.literal('client').default('client'),
        gtmId: z.string().optional(),
      })
      .brand('ClientEnv');

    const envConfig = clientEnvSchema.parse({
      gtmId: import.meta.env.VITE_GTM_ID,
    });

    return envConfig;
  })
  .server(() => {
    throw new ApplicationError(500, 'getClientEnv cannot be called from the server');
  });

export const getServerEnv = createIsomorphicFn()
  .client(() => {
    throw new ApplicationError(500, 'getServerEnv cannot be called from the client');
  })
  .server(() => {
    const serverEnvSchema = z
      .object({
        environment: z.literal('server').default('server'),
        gtmId: z.string().optional(),
      })
      .brand('ServerEnv');

    const envConfig = serverEnvSchema.parse({
      gtmId: import.meta.env.VITE_GTM_ID,
    });

    return envConfig;
  });

const getEnv = createIsomorphicFn()
  .client(() => getClientEnv())
  .server(() => getServerEnv());

export default getEnv;
