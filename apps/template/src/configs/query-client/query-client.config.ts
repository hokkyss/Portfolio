import { QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      /**
       * 5 minutes
       */
      staleTime: 1000 * 60 * 5,
    },
  },
};

export default queryClientConfig;
