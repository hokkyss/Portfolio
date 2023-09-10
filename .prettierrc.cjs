const path = require('node:path');

const alloyConfig = require('eslint-config-alloy/.prettierrc');

/** @type {import("prettier").Config}} */
module.exports = {
	...alloyConfig,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	tailwindConfig: path.join(__dirname, 'tailwind.config.ts')
};
