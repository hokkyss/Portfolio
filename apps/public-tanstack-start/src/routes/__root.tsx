import type { ReactNode } from 'react';
import ThemeProvider from '@portfolio/design-system/application-theme-provider';
import Toaster from '@portfolio/design-system/toaster';
import tw from '@portfolio/design-system/tw';
import { defineOpenGraph, resolveOpenGraph } from '@portfolio/seo/opengraph';
import { defineTwitter, resolveTwitter } from '@portfolio/seo/twitter';
import { defineViewport, resolveViewport } from '@portfolio/seo/viewport';
import { tryit } from '@portfolio/utils';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { type QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { getOrigin } from '@tanstack/react-router/ssr/server';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import getApplicationThemeQuery from '../lib/common/queries/get-application-theme.query';
import appCss from '../styles.css?url';

const getApplicationUrl = createIsomorphicFn()
  .server(() => getOrigin(getRequest()))
  .client(() => location.origin);

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  async loader(ctx) {
    const [, err] = await tryit(ctx.context.queryClient.ensureQueryData(getApplicationThemeQuery()));

    if (err) {
      throw err;
    }

    return {
    };
  },
  shellComponent: RootDocument,
  head: () => ({
    links: [
      {
        href: appCss,
        rel: 'stylesheet',
      },
      {
        href: '/favicon.ico',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        href: '/icon.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        href: '/apple-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      ...resolveViewport(defineViewport({
        colorScheme: 'light dark',
        height: 'device-height',
        initialScale: 1.0,
        minimumScale: 1.0,
        themeColor: '#fff',
        width: 'device-width',
      })),
      ...resolveOpenGraph(defineOpenGraph({
        images: [{
          alt: 'hokkyss | Hokki Suwanda',
          height: 512,
          type: 'image/png',
          url: new URL('/opengraph-image.png', getApplicationUrl()),
          width: 512,
        }],
      })),
      ...resolveTwitter(defineTwitter({
        images: [{
          alt: 'hokkyss | Hokki Suwanda',
          height: 512,
          type: 'image/png',
          url: new URL('/twitter-image.png', getApplicationUrl()),
          width: 512,
        }],
      })),
      {
        title: 'Chat Application',
      },
    ],
  }),
});

/**
 *
 * @param root0
 * @param root0.children
 */
function RootDocument({ children }: { children: ReactNode }) {
  const { data: theme } = useSuspenseQuery(getApplicationThemeQuery());

  return (
    <html data-theme={theme} lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={tw`grid`}>
        <ThemeProvider theme={theme}>
          <Toaster position="bottom-right" />
          {children}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          eventBusConfig={{
            connectToServerBus: true,
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'Tanstack Query',
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
