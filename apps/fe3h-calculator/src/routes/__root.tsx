import tw from '@portfolio/design-system/tw';
import { defineMetadata, resolveMetadata } from '@portfolio/seo/metadata';
import { defineViewport, resolveViewport } from '@portfolio/seo/viewport';
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => {
    const metadata = resolveMetadata(defineMetadata({

    }));

    const viewport = resolveViewport(defineViewport({
      initialScale: 1,
      width: 'device-width',
    }));

    return ({
      links: [
        { href: appCss, rel: 'stylesheet' },
        ...viewport.links, ...metadata.links,
      ],
      meta: [
        { charSet: 'utf-8' },
        ...viewport.metas,
        ...metadata.metas,
      ],
    });
  },
  shellComponent: ShellComponent,
});

/**
 *
 * @param root0
 * @param root0.children
 */
function ShellComponent({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <Scripts />
      </head>
      <body className={tw``}>
        <main className={tw``}>
          {children}
        </main>
      </body>
    </html>
  );
}
