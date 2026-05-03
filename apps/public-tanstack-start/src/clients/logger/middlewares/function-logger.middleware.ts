import ApplicationError from '@portfolio/common/errors/application-error';
import { captureException, startSpan } from '@sentry/tanstackstart-react';
import { isNotFound, isRedirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { setResponseStatus } from '@tanstack/react-start/server';
import loggerInstanceMiddleware from './logger-instance.middleware';
import requestIdMiddleware from './request-id.middleware';

const functionLoggerMiddleware = createMiddleware({ type: 'function' })
  .middleware([requestIdMiddleware, loggerInstanceMiddleware])
  .server((ctx) => {
    return startSpan({
      attributes: {
        'sentry.op': 'portfolio-public-web-tanstack-start.server-function',
        'sentry.origin': 'portfolio-public-web-tanstack-start.server',
      },
      name: ctx.serverFnMeta.name,
      op: 'portfolio-public-web-tanstack-start.server-function',
    }, async (span) => {
      ctx.context.logger.log(
        JSON.stringify({
          method: ctx.method,
          name: ctx.serverFnMeta.name,
          params: ctx.data,
          requestId: ctx.context.requestId,
          timestamp: new Date().toISOString(),
          timing: 'START',
        }),
      );

      try {
        const next = await ctx.next({
          context: {
            span,
          },
        });
        ctx.context.logger.log(
          JSON.stringify({
            method: ctx.method,
            name: ctx.serverFnMeta.name,
            params: ctx.data,
            requestId: ctx.context.requestId,
            timestamp: new Date().toISOString(),
            timing: 'DONE',
          }),
        );
        span.end();
        return next;
      } catch (err) {
        if (isNotFound(err)) {
          span.end();
          throw err;
        }
        if (isRedirect(err)) {
          span.end();
          throw err;
        }
        if (err instanceof ApplicationError) {
          captureException(err, {
            attributes: {
              ...err.payload,
              requestId: ctx.context.requestId,
            },
          });
          setResponseStatus(err.status);
          ctx.context.logger.error(
            JSON.stringify({
              cause: err.cause,
              error: err.name,
              message: err.message,
              name: ctx.serverFnMeta.name,
              requestId: ctx.context.requestId,
              response: undefined,
              stack: err.stack,
              timestamp: new Date().toISOString(),
              ...err.payload,
            }),
          );
          span.end();
          throw err;
        }
        if (err instanceof Error) {
          captureException(err, {
            attributes: {
              requestId: ctx.context.requestId,
            },
          });
          setResponseStatus(500, 'Internal Server Error');
          ctx.context.logger.error(
            JSON.stringify({
              cause: err.cause,
              error: err.name,
              message: err.message,
              name: ctx.serverFnMeta.name,
              requestId: ctx.context.requestId,
              response: undefined,
              stack: err.stack,
              timestamp: new Date().toISOString(),
            }),
          );
          span.end();
          throw err;
        }

        span.end();
        throw new Error(
          'A non error object is found. This is probably a bug in the application',
        );
      }
    });
  });

export default functionLoggerMiddleware;
