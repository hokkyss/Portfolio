import { consoleLoggingIntegration, withSentry } from '@sentry/cloudflare';
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import { runWithExecutionContext } from './lib/common/async-storages/cloudflare-execution-context.storage';

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
  fetch: (req, _env, ctx) => {
    return runWithExecutionContext(() => startHandler(req), ctx);
  },
});
