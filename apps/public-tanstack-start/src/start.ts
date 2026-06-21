import { createCsrfMiddleware, createStart } from '@tanstack/react-start';
import functionLoggerMiddleware from './clients/logger/middlewares/function-logger.middleware';
import loggerInstanceMiddleware from './clients/logger/middlewares/logger-instance.middleware';
import requestIdMiddleware from './clients/logger/middlewares/request-id.middleware';
import queryClientMiddleware from './clients/query/middlewares/query.middleware';
import sanityClientMiddleware from './clients/sanity/middlewares/sanity-client.middleware';
import sentryMiddleware from './clients/sentry/middlewares/sentry.middleware';
import cacheMiddleware from './lib/common/middlewares/cache.middleware';
import clientInjectedMiddleware from './lib/common/middlewares/client-injected.middleware';
import nonceMiddleware from './lib/common/middlewares/nonce.middleware';
import applicationErrorSerializationAdapter from './lib/common/serialization-adapters/application-error.serialization-adapter';

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
});

export const startInstance = createStart(() => ({
  defaultSsr: true,
  functionMiddleware: [
    functionLoggerMiddleware,
    clientInjectedMiddleware,
  ],
  requestMiddleware: [
    csrfMiddleware,
    sentryMiddleware,
    cacheMiddleware,
    queryClientMiddleware,
    nonceMiddleware,
    loggerInstanceMiddleware,
    requestIdMiddleware,
    sanityClientMiddleware,
  ],
  serializationAdapters: [applicationErrorSerializationAdapter],
}));
