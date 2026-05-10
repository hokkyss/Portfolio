import '@tanstack/react-start/server-only';

import { consoleLoggingIntegration, init } from '@sentry/tanstackstart-react';
import { getServerEnv } from '../../configs/env/env.config';

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

export default sentryClient;
