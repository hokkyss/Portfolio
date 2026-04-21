import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        'app-links': './lib/app-links/index',
        icons: './lib/icons/index',
        manifest: './lib/manifest/index',
        opengraph: './lib/opengraph/index',
        robots: './lib/robots/index',
        sitemap: './lib/sitemap/index',
        twitter: './lib/twitter/index',
        viewport: './lib/viewport/index',
      },
      formats: ['es'],
    },
    rollupOptions: {
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
      external: Object.keys(pkg.peerDependencies)
        .map<RegExp | string>((key) => new RegExp(`^${key}(/.+)*`))
        .concat('node:console'),
    },
  },
  plugins: [
    dts({
      entryRoot: './lib',
    }),
  ],
});
