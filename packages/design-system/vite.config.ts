import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import { readdirSync } from 'node:fs';
import { appendFile, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';

export default defineConfig((ctx) => {
  const srcFolder = join(import.meta.dirname, 'src');

  let entries: { entryName: string; path: string }[] = [];

  const watchSrcFolderPlugin = (): Plugin => {
    return {
      buildStart() {
        this.addWatchFile(srcFolder);
      },
      config() {
        entries = readdirSync(
          srcFolder,
          { recursive: true, withFileTypes: true },
        )
          .filter((dirent) => dirent.isFile())
          .map((dirent) => ({
            entryName: basename(dirent.name, extname(dirent.name)),
            path: relative(import.meta.dirname, join(dirent.parentPath, dirent.name)),
          }));

        const viteEntries = entries.reduce<Record<string, string>>((acc, r) => ({ ...acc, [r.entryName]: r.path }), {});

        return {
          build: {
            lib: {
              cssFileName: 'design-system',
              entry: viteEntries,
              formats: ['es'],
              name: '@portfolio/design-system',
            },
          },
        };
      },
      configureServer(server) {
        server.watcher.add(srcFolder);
      },
      name: 'monorepo:design-system:watch-lib',
    };
  };

  /**
   * IMPORTANT: THIS MUST COME AFTER `watchSrcFolderPlugin`
   * @returns
   */
  const packageJsonExportsPlugin = (): Plugin => ({
    async buildStart() {
      const pkg = JSON.parse(await readFile('package.json', 'utf-8')) as Record<string, unknown>;

      const exports: Record<string, unknown> = {
        './index.css': './index.css',
        './package.json': './package.json',
      };

      // NOTE: Sequence matters
      /* eslint-disable perfectionist/sort-objects */
      entries.forEach(({ entryName, path }) => {
        exports[`./${entryName}`] = {
          production: {
            types: `./dist/${entryName}.d.ts`,
            default: `./dist/${entryName}.js`,
          },
          default: `./src/${entryName}/${entryName}.ts`,
        };
      });
      /* eslint-enable perfectionist/sort-objects */

      pkg.exports = exports;

      await writeFile('package.json', JSON.stringify(pkg, undefined, 2));
      await appendFile('package.json', '\n');
    },
    name: 'design-system:package-json:exports',
  });

  return ({
    build: {
      emptyOutDir: true,
      minify: ctx.mode === 'production',
      outDir: 'dist',
      rollupOptions: {
        external: ['react', 'react-dom'],
      },
      sourcemap: ctx.mode === 'development',
    },
    plugins: [
      tsconfigPaths({
        projects: [join(import.meta.dirname, 'tsconfig.json')],
      }),
      dts({
        exclude: ['./*'],
        insertTypesEntry: true,
        rollupTypes: ctx.mode === 'production',
        strictOutput: true,
      }),
      react(),
      watchSrcFolderPlugin(),
      packageJsonExportsPlugin(),
    ],
  });
});
