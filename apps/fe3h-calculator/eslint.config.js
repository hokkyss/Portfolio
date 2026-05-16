import getConfig from '@portfolio/eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  getConfig({
    environment: 'isomorphic',
    outDir: 'dist',
    react: true,
    tanstackQuery: true,
    tanstackRouter: true,
    tsconfigRootDir: import.meta.dirname,
  }),
);
