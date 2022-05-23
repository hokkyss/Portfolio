/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @see https://github.com/shadowwalker/next-pwa
 */
const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	reactStrictMode: true,
	webpack: (
		config,
		{
			dir,
			dev,
			isServer,
			buildId,
			defaultLoaders,
			config: nextConfig,
			webpack,
			totalPages,
		}
	) => {
		return config
	},
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
	},
})

module.exports = nextConfig
