module.exports = {
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'alloy',
		'alloy/typescript',
		'plugin:perfectionist/recommended-natural',
		'prettier'
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		{
			extends: ['plugin:jsonc/recommended-with-json', 'plugin:jsonc/prettier'],
			files: ['*.json'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'jsonc/comma-style': 'error',
				'jsonc/sort-keys': 'error'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'prettier', 'perfectionist'],
	root: true,
	rules: {
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'separate-type-imports',
				prefer: 'type-imports'
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^_'
			}
		],
		'no-console': 'error',
		'no-unused-vars': 'off',
		'perfectionist/sort-imports': [
			'error',
			{
				groups: [
					'side-effect',
					['type', 'builtin-type', 'external-type'],
					'internal-type',
					'parent-type',
					'sibling-type',
					['builtin', 'external'],
					'internal',
					'parent',
					'sibling',
					'unknown'
				]
			}
		],
		'prettier/prettier': ['error', {}, { usePrettierrc: true }]
	}
};
