// Internally uses console.log
/* eslint-disable no-console */
import { type ILoggerClient } from '@portfolio/common/logger';
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
      debug: (...args) => console.debug(...args),
      error: (...args) => console.error(...args),
      group: (...args) => console.group(...args),
      groupEnd: () => console.groupEnd(),
      log: (...args) => console.log(...args),
      table: <T extends Record<string, unknown>>(
        tabularData: T[],
        properties?: (keyof T)[],
      ) => console.table(tabularData, properties as string[]),
      trace: (...args) => console.trace(...args),
      warn: (...args) => console.warn(...args),
    };
  });

export default getLogger;
