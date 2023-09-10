import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			svgoOptions: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false
							}
						}
					},
					'prefixIds',
					'removeDimensions',
					{
						name: 'sortAttrs',
						params: {
							xmlnsOrder: 'alphabetical'
						}
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
