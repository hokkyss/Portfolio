import { createMiddleware } from '@tanstack/react-start';
import getLogger from '../logger.client';

const loggerInstanceMiddleware = createMiddleware({}).server(async (ctx) => {
  return ctx.next({
    context: {
      logger: getLogger(),
    },
  });
});

export default loggerInstanceMiddleware;
