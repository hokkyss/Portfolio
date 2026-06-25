import { cloudflare } from '@cloudflare/vite-plugin';
import createNetlifyPlugin from '@netlify/vite-plugin';
import babel from '@rolldown/plugin-babel';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { DevTools } from '@vitejs/devtools';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { defineConfig, esmExternalRequirePlugin } from 'vite';
import packageJson from './package.json' with { type: 'json' };

const getBuildNumber = () => {
  try {
    return (process.env.COMMIT_REF || process.env.BUILD_ID)?.slice(0, 7) || execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_NUMBER__: JSON.stringify(getBuildNumber()),
    __CLOUDFLARE__: process.env.CLOUDFLARE ? true : false,
    __NETLIFY__: process.env.NETLIFY ? true : false,
  },
  envPrefix: ['PUBLIC_'],
  optimizeDeps: {
    exclude: ['cloudflare:workers'],
  },
  plugins: [
    DevTools({
      build: {
      },
      builtinDevTools: true,
    }),
    esmExternalRequirePlugin({
      external: ['@sparticuz/chromium', '@resvg/resvg-js', 'cloudflare:workers'],
    }),
    devtools({
      consolePiping: {
        enabled: false,
      },
      removeDevtoolsOnBuild: true,
    }),
    tailwindcss(),
    !!process.env.CLOUDFLARE && cloudflare({
      viteEnvironment: { childEnvironments: ['rsc'], name: 'ssr' },
    }),
    !!process.env.CLOUDFLARE && {
      configResolved(config) {
        config.resolve.alias.push({
          find: 'node:process',
          replacement: 'cloudflare:workers',
        });
      },
      name: 'portfolio:public-tanstack-start:env-compat',
    },
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
      rsc: {
        enabled: true,
      },
      server: {
        entry: process.env.CLOUDFLARE ? 'server.cloudflare.ts' : 'server.ts',
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
    rsc(),
    viteReact(),
    babel({
      presets: [reactCompilerPreset({})],
    }),
    !!process.env.NETLIFY && createNetlifyPlugin({
      build: {
        displayName: '@portfolio/public-tanstack-start-function',
        enabled: true,
      },
    }),
    sentryTanstackStart({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORGANIZATION,
      project: process.env.SENTRY_PROJECT,
    }),
  ],
});
