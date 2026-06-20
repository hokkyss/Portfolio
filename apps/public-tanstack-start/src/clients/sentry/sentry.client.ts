import ApplicationError from '@portfolio/common/errors/application-error';
import { getClient } from '@sentry/cloudflare';
import { consoleLoggingIntegration, init } from '@sentry/tanstackstart-react';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getServerEnv } from '../../configs/env/env.config';

const getSentryClient = createIsomorphicFn()
  .client(() => {
    throw new ApplicationError(500, 'getSentryClient cannot be called from the client');
  })
  .server(() => {
    // If we are on Cloudflare, the Sentry client is already initialized by `withSentry`
    // in server.cloudflare.ts. We can retrieve the active client using getClient()
    if (__CLOUDFLARE__) {
      return getClient();
    }

    const serverEnv = getServerEnv();
    const sentryClient = init({
      dsn: serverEnv.sentryDsn,
      // Enable logs to be sent to Sentry
      enableLogs: true,
      enableMetrics: true,
      environment: serverEnv.sentryEnvironment,
      integrations: [
        // send console.log, console.warn, and console.error calls as logs to Sentry
        consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
      ],
      // Adds request headers and IP for users, for more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
      sendDefaultPii: true,
      skipOpenTelemetrySetup: false,
    });

    return sentryClient;
  });

export default getSentryClient;
