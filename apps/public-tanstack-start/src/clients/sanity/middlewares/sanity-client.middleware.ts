import { createMiddleware } from '@tanstack/react-start';
import getSanityClient from '../sanity.client';

const sanityClientMiddleware = createMiddleware()
  .server((ctx) => {
    const sanityClient = getSanityClient();

    return ctx.next({
      context: {
        sanityClient,
      },
    });
  });

export default sanityClientMiddleware;
