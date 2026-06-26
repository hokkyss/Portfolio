import { readdirSync } from 'node:fs';
import { appendFile, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative } from 'node:path';
import { defineConfig, esmExternalRequirePlugin, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';

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
          types: `./dist/types/${join(dirname(path), basename(path, extname(path)))}.d.ts`,
          'react-server': `./dist/rsc/${entryName}.js`,
          browser: `./dist/client/${entryName}.js`,
          default: `./dist/ssr/${entryName}.js`,
        };
      });
      /* eslint-enable perfectionist/sort-objects */

      pkg.exports = exports;

      await writeFile('package.json', JSON.stringify(pkg, undefined, 2));
      await appendFile('package.json', '\n');
    },
    name: 'design-system:package-json:exports',
  });

  return {
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
          sourcemap: ctx.mode === 'development',
        },
        consumer: 'client',
      },
      rsc: {
        build: {
          emptyOutDir: true,
          minify: 'oxc',
          outDir: 'dist/rsc',
          sourcemap: ctx.mode === 'development',
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
          sourcemap: ctx.mode === 'development',
        },
        consumer: 'server',
        resolve: {
          noExternal: true,
        },
      },
    },
    plugins: [
      esmExternalRequirePlugin({
        external: ['react', 'react-dom', 'react/jsx-runtime'],
      }),
      watchSrcFolderPlugin(),
      packageJsonExportsPlugin(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
  };
});
