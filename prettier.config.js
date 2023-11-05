// This configuration file is CommonJS
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const alloyPrettier = require('eslint-config-alloy/.prettierrc');
const path = require('path');

/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  ...alloyPrettier,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: path.join(__dirname, 'tailwind.config.ts'),
  tailwindFunctions: ['tw'],
};

module.exports = prettierConfig;
