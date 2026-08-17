import { defineConfig, esmExternalRequirePlugin } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: {
        callout: './lib/callout.ts',
        mermaid: './lib/mermaid.ts',
      },
      formats: ['es'],
    },
  },
  builder: {
    async buildApp(builder) {
      await builder.build(builder.environments.rsc);
      await builder.build(builder.environments.ssr);
      await builder.build(builder.environments.client);
    },
  },
  environments: {
    client: {
      build: {
        emptyOutDir: true,
        minify: 'oxc',
        outDir: 'dist/client',
        rolldownOptions: {
          plugins: [
            dts({
              exclude: ['./*'],
              outDir: './dist/types',
            }),
          ],
        },
        sourcemap: true,
      },
      consumer: 'client',
    },
    rsc: {
      build: {
        emptyOutDir: true,
        minify: 'oxc',
        outDir: 'dist/rsc',
        sourcemap: true,
      },
      consumer: 'server',
      resolve: {
        noExternal: true,
      },
    },
    ssr: {
      build: {
        emptyOutDir: true,
        minify: 'oxc',
        outDir: 'dist/ssr',
        sourcemap: true,
      },
      consumer: 'server',
      resolve: {
        noExternal: true,
      },
    },
  },
  plugins: [
    esmExternalRequirePlugin({
      external: Object.keys((pkg as { peerDependencies?: Record<string, string> }).peerDependencies ?? {})
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
        .map<RegExp | string>((key) => new RegExp(`^${key}(/.+)*`)),
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
