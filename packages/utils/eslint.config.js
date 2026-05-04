import getConfig from '@portfolio/eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  getConfig({
    environment: 'isomorphic',
    outDir: 'dist',
    react: true,
    tanstackQuery: false,
    tanstackRouter: false,
    tsconfigRootDir: import.meta.dirname,
  }),
);
