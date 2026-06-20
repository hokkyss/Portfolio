import ApplicationError from '@portfolio/common/errors/application-error';
import { AsyncLocalStorage } from 'node:async_hooks';

const cloudflareExecutionContextStorage = new AsyncLocalStorage<ExecutionContext>();

export const runWithExecutionContext = <T>(
  fn: () => T,
  executionContext: ExecutionContext,
) => {
  return cloudflareExecutionContextStorage.run(executionContext, fn);
};

export const getExecutionContext = () => {
  if (!__CLOUDFLARE__) {
    throw new ApplicationError(500, 'Not running in Cloudflare environment');
  }

  const executionContext = cloudflareExecutionContextStorage.getStore();
  if (!executionContext) {
    throw new ApplicationError(500, 'Cloudflare execution context not found');
  }

  return executionContext;
};
