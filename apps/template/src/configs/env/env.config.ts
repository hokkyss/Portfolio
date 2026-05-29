import ApplicationError from '@portfolio/common/errors/application-error';
import { createIsomorphicFn } from '@tanstack/react-start';
import { z } from 'zod/v4';

export const getClientEnv = createIsomorphicFn()
  .client(() => {
    const clientEnvSchema = z
      .object({
        enableRobots: z.never().optional(),
        environment: z.literal('client').default('client'),
        firebaseApiKey: z.string(),
        firebaseAppId: z.string(),
        firebaseAuthDomain: z.string(),
        firebaseDatabaseUrl: z.string().optional(),
        firebaseMeasurementId: z.string(),
        firebaseMessagingSenderId: z.string(),
        firebaseProjectId: z.string(),
        firebaseStorageBucket: z.string().optional(),
        gtmId: z.string().optional(),
      })
      .brand('ClientEnv');

    const envConfig = clientEnvSchema.parse({
      firebaseApiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as never,
      firebaseAppId: import.meta.env.PUBLIC_FIREBASE_APP_ID as never,
      firebaseAuthDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN as never,
      firebaseDatabaseUrl: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL as never,
      firebaseMeasurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID as never,
      firebaseMessagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID as never,
      firebaseProjectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as never,
      firebaseStorageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET as never,
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
        enableRobots: z.coerce.boolean(),
        environment: z.literal('server').default('server'),
        firebaseApiKey: z.string(),
        firebaseAppId: z.string(),
        firebaseAuthDomain: z.string(),
        firebaseDatabaseUrl: z.string().optional(),
        firebaseMeasurementId: z.string(),
        firebaseMessagingSenderId: z.string(),
        firebaseProjectId: z.string(),
        firebaseStorageBucket: z.string().optional(),
        gtmId: z.string().optional(),
      })
      .brand('ServerEnv');

    const envConfig = serverEnvSchema.parse({
      enableRobots: process.env.ENABLE_ROBOTS,
      firebaseApiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as never,
      firebaseAppId: import.meta.env.PUBLIC_FIREBASE_APP_ID as never,
      firebaseAuthDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN as never,
      firebaseDatabaseUrl: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL as never,
      firebaseMeasurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID as never,
      firebaseMessagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID as never,
      firebaseProjectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as never,
      firebaseStorageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET as never,
      gtmId: import.meta.env.PUBLIC_GTM_ID as never,
    });

    return envConfig;
  });

const getEnv = createIsomorphicFn()
  .client(() => getClientEnv())
  .server(() => getServerEnv());

export default getEnv;
