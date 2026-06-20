import { defineConfig, esmExternalRequirePlugin } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        'errors/application-error': './lib/errors/application.error',
        logger: './lib/logger/index',
      },
      formats: ['es'],
    },
  },
  plugins: [
    esmExternalRequirePlugin({
      external: Object.keys(pkg.peerDependencies)
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
        .map<RegExp | string>((key) => new RegExp(`^${key}(/.+)*`))
        .concat('node:console'),
    }),
    dts({
      entryRoot: './lib',
    }),
  ],
});
