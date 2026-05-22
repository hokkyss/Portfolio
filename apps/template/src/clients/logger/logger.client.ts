// Internally uses console.log
/* eslint-disable no-console */
import { type ILoggerClient } from '@portfolio/common/logger';
import { logger } from '@sentry/tanstackstart-react';
import { createIsomorphicFn } from '@tanstack/react-start';

/**
 *
 */
function noop() {
}

const getLogger = createIsomorphicFn()
  .client(function getLoggerClient(): ILoggerClient {
    return {
      debug: import.meta.env.DEV ? (...args) => console.debug(...args) : noop,
      error: (...args) => console.error(...args),
      group: import.meta.env.DEV ? (...args) => console.group(...args) : noop,
      groupEnd: import.meta.env.DEV ? () => console.groupEnd() : noop,
      log: import.meta.env.DEV ? (...args) => console.log(...args) : noop,
      table: import.meta.env.DEV
        ? <T extends Record<string, unknown>>(
            tabularData: T[],
            properties?: (keyof T)[],
          ) => console.table(tabularData, properties as string[])
        : noop,
      trace: import.meta.env.DEV ? (...args) => console.trace(...args) : noop,
      warn: import.meta.env.DEV ? (...args) => console.warn(...args) : noop,
    };
  })
  .server(function getLoggerServer(): ILoggerClient {
    return {
      debug: (payload) => logger.debug(logger.fmt`${payload}`),
      error: (payload) => logger.error(logger.fmt`${payload}`),
      group: noop,
      groupEnd: noop,
      log: (payload) => logger.info(logger.fmt`${payload}`),
      table: noop,
      trace: (payload) => logger.trace(payload),
      warn: (payload) => logger.warn(logger.fmt`${payload}`),
    };
  });

export default getLogger;
