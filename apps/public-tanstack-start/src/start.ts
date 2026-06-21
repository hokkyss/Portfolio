import { createStart } from '@tanstack/react-start';
import functionLoggerMiddleware from './clients/logger/middlewares/function-logger.middleware';
import loggerInstanceMiddleware from './clients/logger/middlewares/logger-instance.middleware';
import requestIdMiddleware from './clients/logger/middlewares/request-id.middleware';
import queryClientMiddleware from './clients/query/middlewares/query.middleware';
import sanityClientMiddleware from './clients/sanity/middlewares/sanity-client.middleware';
import sentryMiddleware from './clients/sentry/middlewares/sentry.middleware';
import cacheMiddleware from './lib/common/middlewares/cache.middleware';
import clientInjectedMiddleware from './lib/common/middlewares/client-injected.middleware';
import errorResponseMiddleware from './lib/common/middlewares/error-response.middleware';
import nonceMiddleware from './lib/common/middlewares/nonce.middleware';
import applicationErrorSerializationAdapter from './lib/common/serialization-adapters/application-error.serialization-adapter';

export const startInstance = createStart(() => ({
  defaultSsr: true,
  functionMiddleware: [
    functionLoggerMiddleware,
    clientInjectedMiddleware,
  ],
  requestMiddleware: [
    // There is no particular order on these middlewares
    // If there is a need for specific order, middlewares has `.middleware()`. Maybe try doing that.
    loggerInstanceMiddleware,
    requestIdMiddleware,
    sentryMiddleware,
    errorResponseMiddleware,
    queryClientMiddleware,
    cacheMiddleware,
    nonceMiddleware,
    sanityClientMiddleware,
  ],
  serializationAdapters: [applicationErrorSerializationAdapter],
}));
