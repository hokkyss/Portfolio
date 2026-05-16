import { createStart } from '@tanstack/react-start';
import queryClientMiddleware from './lib/common/clients/query/middlewares/query.middleware';
import clientInjectedMiddleware from './lib/common/middlewares/client-injected.middleware';
import nonceMiddleware from './lib/common/middlewares/nonce.middleware';
import applicationErrorSerializationAdapter from './lib/common/serialization-adapters/application-error.serialization-adapter';

export const startInstance = createStart(() => ({
  defaultSsr: true,
  functionMiddleware: [
    clientInjectedMiddleware,
  ],
  requestMiddleware: [
    queryClientMiddleware,
    nonceMiddleware,
  ],
  serializationAdapters: [applicationErrorSerializationAdapter],
}));
