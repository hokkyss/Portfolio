import ApplicationError from '@portfolio/common/errors/application-error';
import { isNotFound, isRedirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { setResponseStatus } from '@tanstack/react-start/server';
import loggerInstanceMiddleware from './logger-instance.middleware';
import requestIdMiddleware from './request-id.middleware';

const functionLoggerMiddleware = createMiddleware({ type: 'function' })
  .middleware([requestIdMiddleware, loggerInstanceMiddleware])
  .server(async (ctx) => {
    ctx.context.logger.log(
      ctx.context.requestId,
      JSON.stringify({
        method: ctx.method,
        name: ctx.serverFnMeta.name,
        params: ctx.data,
        timestamp: new Date().toISOString(),
        timing: 'START',
      }),
    );

    try {
      const next = await ctx.next();
      ctx.context.logger.log(
        ctx.context.requestId,
        JSON.stringify({
          method: ctx.method,
          name: ctx.serverFnMeta.name,
          params: ctx.data,
          timestamp: new Date().toISOString(),
          timing: 'DONE',
        }),
      );
      return next;
    } catch (err) {
      if (isNotFound(err)) {
        throw err;
      }
      if (isRedirect(err)) {
        throw err;
      }
      if (err instanceof ApplicationError) {
        setResponseStatus(err.status);
        ctx.context.logger.error(
          ctx.context.requestId,
          JSON.stringify({
            cause: err.cause,
            error: err.name,
            message: err.message,
            name: ctx.serverFnMeta.name,
            response: undefined,
            stack: err.stack,
            timestamp: new Date().toISOString(),
          }),
        );
        throw err;
      }
      if (err instanceof Error) {
        setResponseStatus(500, 'Internal Server Error');
        ctx.context.logger.error(
          ctx.context.requestId,
          JSON.stringify({
            cause: err.cause,
            error: err.name,
            message: err.message,
            name: ctx.serverFnMeta.name,
            response: undefined,
            stack: err.stack,
            timestamp: new Date().toISOString(),
          }),
        );
        throw err;
      }

      throw new Error(
        'A non error object is found. This is probably a bug in the application',
      );
    }
  });

export default functionLoggerMiddleware;
