import createNetlifyTanstackStartPlugin from '@netlify/vite-plugin-tanstack-start';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { defineConfig } from 'vite';

const config = defineConfig({
  envPrefix: ['VITE_'],
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
    createNetlifyTanstackStartPlugin(),
  ],
});

export default config;
