import ApplicationError from '@portfolio/common/errors/application-error';
import { createIsomorphicFn } from '@tanstack/react-start';
import { z } from 'zod/v4';

export const getClientEnv = createIsomorphicFn()
  .client(() => {
    const clientEnvSchema = z
      .object({
        cmsApiVersion: z.never().optional(),
        cmsDataset: z.never().optional(),
        cmsProjectId: z.never().optional(),
        cmsToken: z.never().optional(),
        environment: z.literal('client').default('client'),
        gtmId: z.string().optional(),
      })
      .brand('ClientEnv');

    const envConfig = clientEnvSchema.parse({
      gtmId: import.meta.env.PUBLIC_GTM_ID as never,
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
        cmsApiVersion: z.string().prefault('2023-11-07'),
        cmsDataset: z.string(),
        cmsProjectId: z.string(),
        cmsToken: z.string(),
        environment: z.literal('server').default('server'),
        gtmId: z.string().optional(),
      })
      .brand('ServerEnv');

    const envConfig = serverEnvSchema.parse({
      cmsApiVersion: process.env.CMS_API_VERSION,
      cmsDataset: process.env.CMS_DATASET,
      cmsProjectId: process.env.CMS_PROJECT_ID,
      cmsToken: process.env.CMS_TOKEN,
      gtmId: import.meta.env.PUBLIC_GTM_ID as never,
    });

    return envConfig;
  });

const getEnv = createIsomorphicFn()
  .client(() => getClientEnv())
  .server(() => getServerEnv());

export default getEnv;
