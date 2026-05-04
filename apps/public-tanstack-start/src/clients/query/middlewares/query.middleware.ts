import { QueryClient } from '@tanstack/react-query';
import { createMiddleware } from '@tanstack/react-start';
import queryClientConfig from '../../../configs/query-client/query-client.config';

const queryClientMiddleware = createMiddleware({ type: 'request' })
  .server(({ next }) => {
    return next({
      context: {
        queryClient: new QueryClient(queryClientConfig),
      },
    });
  });

export default queryClientMiddleware;
