import { CircleNotchIcon } from '@phosphor-icons/react';
import ApplicationError from '@portfolio/common/errors/application-error';
import ThemeProvider from '@portfolio/design-system/application-theme-provider';
import Button from '@portfolio/design-system/button';
import CardComponent from '@portfolio/design-system/card';
import CardContentComponent from '@portfolio/design-system/card-content';
import CardTitleComponent from '@portfolio/design-system/card-title';
import Toaster from '@portfolio/design-system/toaster';
import tw from '@portfolio/design-system/tw';
import { defineIcons, resolveIcons } from '@portfolio/seo/icons';
import { defineMetadata, resolveMetadata } from '@portfolio/seo/metadata';
import { defineOpenGraph, resolveOpenGraph } from '@portfolio/seo/opengraph';
import { defineTwitter, resolveTwitter } from '@portfolio/seo/twitter';
import { defineViewport, resolveViewport } from '@portfolio/seo/viewport';
import { tryit } from '@portfolio/utils';
import { captureException } from '@sentry/tanstackstart-react';
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
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { type ReactNode, useMemo } from 'react';
import MobileTabBar from '../components/molecules/mobile-tab-bar.molecule';
import NavBar from '../components/molecules/nav-bar.molecule';
import ContactSection from '../components/organisms/contact.section';
import getEnv from '../configs/env/env.config';
import getApplicationThemeQuery from '../lib/common/queries/get-application-theme.query';
import appCss from '../styles.css?url';
import getOrigin from '../utils/get-origin';

/**
 *
 * @param window
 * @param document
 * @param scriptTagName
 * @param layerName
 * @param gtmId
 */
function gtm(window: Window, document: Document, scriptTagName: 'script', layerName: 'dataLayer', gtmId: string) {
  window[layerName] = window[layerName] || [];
  window[layerName].push({
    event: 'gtm.js',
    'gtm.start': new Date().getTime(),
  });

  const firstScriptElement = document.getElementsByTagName(scriptTagName)[0];
  const gtmScript = document.createElement(scriptTagName);

  // minified from gtm script
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const dataLayerParam = layerName != 'dataLayer' ? '&l=' + layerName : '';

  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId + dataLayerParam;
  firstScriptElement.parentNode!.insertBefore(gtmScript, firstScriptElement);
}

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

    return {};
  },
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
  head: () => {
    const env = getEnv();

    const iconsMetadata = resolveIcons(defineIcons({
      apple: [{
        sizes: '180x180',
        type: 'image/png',
        url: '/apple-icon.png',
      }],
      icon: [{
        sizes: '16x16',
        type: 'image/x-icon',
        url: '/favicon.ico',
      }, {
        sizes: '512x512',
        type: 'image/png',
        url: '/icon.png',
      }],
    }));

    const viewportMetadata = resolveViewport(defineViewport({
      colorScheme: 'light dark black-eagles golden-deer blue-lions',
      height: 'device-height',
      initialScale: 1.0,
      minimumScale: 1.0,
      themeColor: '#fff',
      width: 'device-width',
    }));

    const openGraphMetadata = resolveOpenGraph(defineOpenGraph({
      images: [{
        alt: 'hokkyss | Hokki Suwanda',
        height: 512,
        type: 'image/png',
        url: new URL('/opengraph-image.png', getApplicationUrl()),
        width: 512,
      }],
    }));

    const twitterMetadata = resolveTwitter(defineTwitter({
      images: [{
        alt: 'hokkyss | Hokki Suwanda',
        height: 512,
        type: 'image/png',
        url: new URL('/twitter-image.png', getApplicationUrl()),
        width: 512,
      }],
    }));

    const metadata = resolveMetadata(defineMetadata({
      applicationName: 'Hokki Suwanda Portfolio',
      authors: [{ name: 'Hokki Suwanda', url: 'https://github.com/hokkyss' }],
      creator: 'Hokki Suwanda',
      description:
    'I\'m Hokki Suwanda, a fullstack software engineer. A Computer Science Fresh Graduate. Full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech stacks.',
      /**
       * Full Stack Framework no2 (Next.js is no1 by sequence)
       */
      generator: 'FSFW02',
      keywords: [
        'Hokki Suwanda',
        'hokkyss',
        'software engineer',
        'fullstack engineer',
        'front end engineer',
        'back end engineer',
        'web developer',
        'ITB',
        'Bandung Institute of Technology',
        'Institut Teknologi Bandung',
        'competitive programming',
      ],
      manifest: new URL('manifest.webmanifest', getApplicationUrl()).toString(),
      other: {
        'google-site-verification': ['SopKMe65nppr9IAQ7VUBO9NGz7Rek--0P1sqHEyvIOU'],
      },
      /**
       * Deployment Platform: netlify
       */
      publisher: 'DPN',
      title: 'hokkyss | Hokki Suwanda',
    }));

    return {
      links: [
        {
          fetchPriority: 'high',
          href: appCss,
          rel: 'stylesheet',
        },
        ...iconsMetadata.links,
        ...viewportMetadata.links,
        ...openGraphMetadata.links,
        ...twitterMetadata.links,
        ...metadata.links,
      ],
      meta: [
        {
          charSet: 'utf-8',
        },
        ...iconsMetadata.metas,
        ...viewportMetadata.metas,
        ...openGraphMetadata.metas,
        ...twitterMetadata.metas,
        ...metadata.metas,
      ],
      scripts: [
        ...(env.gtmId
          ? [{
              children: `(${gtm.toString()})(window, document, 'script', 'dataLayer', '${env.gtmId}')`,
            }]
          : []),
      ],
    };
  },
  shouldReload: false,
});

/**
 * Global error boundary — shown when a loader or component throws.
 * @param root0
 * @param root0.error
 * @param root0.reset
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const eventId = useMemo(() => captureException(error, {
    event_id: error instanceof ApplicationError ? error.payload['requestId'] as string : undefined,
  }), [error]);

  return (
    <div className={tw`flex min-h-screen items-center justify-center p-8`}>
      <CardComponent className={tw`max-w-md w-full`}>
        <CardContentComponent className={tw`flex flex-col gap-y-4 pt-6`}>
          <CardTitleComponent>Something went wrong</CardTitleComponent>
          <p className={tw`text-sm text-muted-foreground`}>{error.message}</p>
          <p className={tw`text-xs text-muted-foreground font-mono`}>
            Request ID:
            {' '}
            {error instanceof ApplicationError ? error.payload['requestId'] as string : eventId}
          </p>
          <p className={tw`text-xs text-muted-foreground font-mono`}>
            Build:
            {' '}
            {__BUILD_NUMBER__}
          </p>
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}

/**
 * Global 404 page — shown when no route matches.
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
 * Global pending (loading) state — shown while route loaders are running.
 */
function PendingComponent() {
  return (
    <div className={tw`flex min-h-screen items-center justify-center`}>
      <CircleNotchIcon aria-label="Loading" className={tw`h-12 w-12 animate-spin text-primary`} />
    </div>
  );
}

/**
 *
 * @param root0
 * @param root0.children
 */
function RootDocument({ children }: { children: ReactNode }) {
  const { data: theme } = useSuspenseQuery(getApplicationThemeQuery());
  const env = getEnv();

  return (
    <html data-theme={theme} dir="ltr" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={tw`grid notranslate`}>
        {env.gtmId && (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${env.gtmId}`}
              style={{ display: 'none', visibility: 'hidden' }}
              width="0"
            >
            </iframe>
          </noscript>
        )}
        <ThemeProvider theme={theme}>
          <NavBar className={tw`peer`} />
          {children}
          <ContactSection />
          <footer className={tw`p-4 pb-20 text-center hidden md:pb-4 [.peer~:not([style*="display:_none"]):not(template)~&]:block`}>
            <p className={tw`text-xs text-muted-foreground`}>
              v
              {__APP_VERSION__}
              {' '}
              (
              {__BUILD_NUMBER__}
              )
              {' '}
            </p>
          </footer>
          <Toaster position="bottom-right" />
          <MobileTabBar />
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
