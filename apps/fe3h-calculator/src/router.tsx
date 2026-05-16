import TooltipProvider from '@portfolio/design-system/tooltip-provider';
import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { getGlobalStartContext } from '@tanstack/react-start';
import { routeTree } from './routeTree.gen';

/**
 *
 * @param pathname
 */
export function getRouter() {
  const startServerContext = getGlobalStartContext();
  const queryClient = startServerContext?.queryClient ?? new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createTanstackRouter({
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    routeTree,
    ssr: {
      nonce: startServerContext?.nonce,
    },
    trailingSlash: 'never',
    Wrap(props) {
      return <TooltipProvider delay={0} {...props} />;
    },
  });

  setupRouterSsrQueryIntegration({
    handleRedirects: true,
    queryClient,
    router,
    wrapQueryClient: true,
  });

  return router;
}
