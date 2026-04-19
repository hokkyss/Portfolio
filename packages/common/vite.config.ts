import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        'errors/application-error': './lib/errors/application.error',
        logger: './lib/logger/index',
        'time-zone/supported-time-zones': './lib/time-zone/supported-time-zones',
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
