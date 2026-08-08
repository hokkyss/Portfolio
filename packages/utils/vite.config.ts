import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index',
      formats: ['es'],
    },
  },
  builder: {
    async buildApp(builder) {
      await builder.build(builder.environments.ssr);
      await builder.build(builder.environments.rsc);
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
  resolve: {
    tsconfigPaths: true,
  },
});
