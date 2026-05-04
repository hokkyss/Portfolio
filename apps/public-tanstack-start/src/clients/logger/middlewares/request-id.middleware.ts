import { createMiddleware } from '@tanstack/react-start';
import { randomUUID } from 'node:crypto';

const requestIdMiddleware = createMiddleware().server(async ({ next, request }) => {
  const requestId = request.headers.get('x-request-id') ?? randomUUID();

  const nextResult = await next({
    context: {
      requestId,
    },
  });

  nextResult.response.headers.set('X-Request-Id', requestId);

  return nextResult;
});

export default requestIdMiddleware;
