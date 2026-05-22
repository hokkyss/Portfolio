import createNetlifyPlugin from '@netlify/vite-plugin';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };

const getBuildNumber = () => {
  try {
    return (process.env.COMMIT_REF || process.env.BUILD_ID)?.slice(0, 7) || execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

const config = defineConfig({
  build: {
    rollupOptions: {
      external: ['@resvg/resvg-js'],
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_NUMBER__: JSON.stringify(getBuildNumber()),
  },
  envPrefix: ['PUBLIC_'],
  optimizeDeps: {
    exclude: ['@resvg/resvg-js'],
  },
  plugins: [
    devtools({
      consolePiping: {
        enabled: false,
      },
      removeDevtoolsOnBuild: true,
    }),
    tailwindcss({
      optimize: {
        minify: true,
      },
    }),
    tanstackStart({
      client: {
        entry: 'client.tsx',
      },
      importProtection: {
        behavior: 'error',
        client: {
          files: [],
          specifiers: [],
        },
        enabled: true,
        log: 'always',
        server: {
          files: [],
          specifiers: [],
        },
      },
      router: {
        entry: 'router.tsx',
      },
      server: {
        entry: 'server.ts',
      },
      serverFns: {
        generateFunctionId: ({ filename, functionName }) => {
          return createHash('sha256')
            .update(`${filename}:${functionName}`)
            .digest('base64url');
        },
      },
      start: {
        entry: 'start.ts',
      },
    }),
    viteReact({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    createNetlifyPlugin({
      build: {
        displayName: '@portfolio/template',
        enabled: true,
      },
    }),
  ],
});

export default config;
