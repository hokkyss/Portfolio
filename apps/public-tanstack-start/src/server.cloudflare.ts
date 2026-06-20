import { consoleLoggingIntegration, withSentry } from '@sentry/cloudflare';
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';

const startHandler = createStartHandler({
  handler: defaultStreamHandler,
});

export default withSentry((env) => ({
  dsn: env.SENTRY_DSN,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  enableMetrics: true,
  environment: env.SENTRY_ENVIRONMENT,
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
  ],
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  skipOpenTelemetrySetup: false,
}), {
  fetch: (req) => {
    return startHandler(req);
  },
});
