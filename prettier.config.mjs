import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// alloyPrettier is commonjs
const alloyPrettier = require('eslint-config-alloy/.prettierrc');

/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  ...alloyPrettier,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['tw'],
};

export default prettierConfig;
