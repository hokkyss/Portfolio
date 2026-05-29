import { createMiddleware } from '@tanstack/react-start';

/**
 * A middleware to verify that a function is called from the client side
 */
const clientInjectedMiddleware = createMiddleware({ type: 'function' })
  .client(async (ctx) => {
    return ctx.next({
      sendContext: {
        isFromClient: true,
      },
    });
  });

export default clientInjectedMiddleware;
