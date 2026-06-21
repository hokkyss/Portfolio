import ApplicationError from '@portfolio/common/errors/application-error';
import { isNotFound, isRedirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import requestIdMiddleware from '../../../clients/logger/middlewares/request-id.middleware';

const errorResponseMiddleware = createMiddleware({ type: 'request' })
  .middleware([requestIdMiddleware])
  .server(async (ctx) => {
    if (ctx.serverFnMeta) {
      return ctx.next();
    }

    try {
      const result = await ctx.next();
      return result;
    } catch (e) {
      if (isRedirect(e)) {
        throw e;
      }
      if (isNotFound(e)) {
        throw e;
      }
      if (e instanceof ApplicationError) {
        return Response.json(
          {
            message: e.message,
            payload: e.payload,
            requestId: ctx.context.requestId,
            stack: e.stack,
          },
          { status: e.status },
        );
      }

      if (e instanceof Error) {
        return Response.json(
          {
            message: e.message,
            requestId: ctx.context.requestId,
            stack: e.stack,
          },
          { status: 500 },
        );
      }

      return Response.json(
        {
          message: 'Something went wrong!',
          requestId: ctx.context.requestId,
        },
        { status: 500 },
      );
    }
  });

export default errorResponseMiddleware;
