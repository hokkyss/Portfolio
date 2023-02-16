/* eslint-disable @typescript-eslint/no-var-requires */

const cache = require('./cache')
/**
 * @see https://github.com/shadowwalker/next-pwa
 */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	runtimeCaching: cache,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		appDir: false,
	},
}

module.exports = withPWA(nextConfig)
