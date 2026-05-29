import { createMiddleware, createStart } from '@tanstack/react-start';
import functionLoggerMiddleware from './clients/logger/middlewares/function-logger.middleware';
import loggerInstanceMiddleware from './clients/logger/middlewares/logger-instance.middleware';
import requestIdMiddleware from './clients/logger/middlewares/request-id.middleware';
import queryClientMiddleware from './clients/query/middlewares/query.middleware';
import sanityClientMiddleware from './clients/sanity/middlewares/sanity-client.middleware';
import nonceMiddleware from './lib/common/middlewares/nonce.middleware';
import applicationErrorSerializationAdapter from './lib/common/serialization-adapters/application-error.serialization-adapter';

const isFunctionCalledFromClient = createMiddleware({ type: 'function' })
  .client(async (ctx) => {
    return ctx.next({
      sendContext: {
        isFromClient: true,
      },
    });
  });

export const startInstance = createStart(() => ({
  defaultSsr: true,
  functionMiddleware: [
    functionLoggerMiddleware,
    isFunctionCalledFromClient,
  ],
  requestMiddleware: [
    queryClientMiddleware,
    nonceMiddleware,
    loggerInstanceMiddleware,
    requestIdMiddleware,
    sanityClientMiddleware,
  ],
  serializationAdapters: [applicationErrorSerializationAdapter],
}));
