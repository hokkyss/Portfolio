import '@tanstack/react-start/server-only';

import { consoleLoggingIntegration, init } from '@sentry/tanstackstart-react';

const sentryClient = init({
  dsn: 'https://c3abd097ee4154de141edccff84b04fe@o4511325670932480.ingest.de.sentry.io/4511325687251024',
  // Enable logs to be sent to Sentry
  enableLogs: true,
  environment: import.meta.env.MODE,
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
