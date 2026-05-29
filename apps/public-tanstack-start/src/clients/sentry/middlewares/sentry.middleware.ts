import { createMiddleware } from '@tanstack/react-start';
import getSentryClient from '../sentry.client';

const sentryMiddleware = createMiddleware()
  .server((ctx) => {
    const sentryClient = getSentryClient();

    return ctx.next({
      context: {
        sentryClient,
      },
    });
  });

export default sentryMiddleware;
