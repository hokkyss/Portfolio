import { CircleNotchIcon } from '@phosphor-icons/react';
import ThemeProvider from '@portfolio/design-system/application-theme-provider';
import Button from '@portfolio/design-system/button';
import CardComponent from '@portfolio/design-system/card';
import CardContentComponent from '@portfolio/design-system/card-content';
import CardTitleComponent from '@portfolio/design-system/card-title';
import tw from '@portfolio/design-system/tw';
import { defineMetadata, resolveMetadata } from '@portfolio/seo/metadata';
import { defineViewport, resolveViewport } from '@portfolio/seo/viewport';
import { tryit } from '@portfolio/utils';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { type QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { type ReactNode } from 'react';
import NavBar from '../components/molecules/nav-bar.molecule';
import getApplicationThemeQuery from '../lib/common/queries/get-application-theme.query';
import appCss from '../styles.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  async loader(ctx) {
    const [, err] = await tryit(ctx.context.queryClient.ensureQueryData(getApplicationThemeQuery()));
    if (err) throw err;
    return {};
  },
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
  head: () => {
    const viewportMetadata = resolveViewport(defineViewport({
      initialScale: 1.0,
      minimumScale: 1.0,
      width: 'device-width',
    }));

    const metadata = resolveMetadata(defineMetadata({
      applicationName: 'FE3H Calculator',
      authors: [{ name: 'Hokki Suwanda', url: 'https://github.com/hokkyss' }],
      description: 'Fire Emblem: Three Houses growth rate and max stat calculator. Analyze character stats across all classes.',
      keywords: ['fire emblem', 'three houses', 'fe3h', 'growth rate', 'max stats', 'calculator', 'edelgard', 'dimitri', 'claude'],
      title: 'FE3H Calc — Growth & Stats Calculator',
    }));

    return {
      links: [
        { fetchPriority: 'high', href: appCss, rel: 'stylesheet' },
        ...viewportMetadata.links,
        ...metadata.links,
      ],
      meta: [
        { charSet: 'utf-8' },
        ...viewportMetadata.metas,
        ...metadata.metas,
      ],
    };
  },
  shouldReload: false,
});

/**
 * Global error boundary.
 * @param root0
 * @param root0.error
 * @param root0.reset
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className={tw`flex min-h-screen items-center justify-center p-8`}>
      <CardComponent className={tw`max-w-md w-full`}>
        <CardContentComponent className={tw`flex flex-col gap-y-4 pt-6`}>
          <CardTitleComponent>Something went wrong</CardTitleComponent>
          <p className={tw`text-sm text-muted-foreground`}>{error.message}</p>
          <Button onClick={reset} variant="outline">Try again</Button>
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}

/**
 * Global 404 page.
 */
function NotFoundComponent() {
  return (
    <div className={tw`flex min-h-screen items-center justify-center p-8`}>
      <CardComponent className={tw`max-w-md w-full`}>
        <CardContentComponent className={tw`flex flex-col gap-y-4 pt-6`}>
          <CardTitleComponent>404 — Page not found</CardTitleComponent>
          <p className={tw`text-sm text-muted-foreground`}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button nativeButton={false} render={<Link to="/">Return Home</Link>} variant="outline" />
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}

/**
 * Global loading state.
 */
function PendingComponent() {
  return (
    <div className={tw`flex min-h-screen items-center justify-center`}>
      <CircleNotchIcon aria-label="Loading" className={tw`h-12 w-12 animate-spin text-primary`} />
    </div>
  );
}

/**
 * Root document shell.
 * @param root0
 * @param root0.children
 */
function RootDocument({ children }: { children: ReactNode }) {
  const { data: theme } = useSuspenseQuery(getApplicationThemeQuery());

  return (
    <html data-theme={theme} dir="ltr" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={tw`grid min-h-screen notranslate`}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <main className={tw`pt-16`}>
            {children}
          </main>
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
              { name: 'Tanstack Query', render: <ReactQueryDevtoolsPanel /> },
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
