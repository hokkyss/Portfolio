/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true' || process.env.ANALYZE === true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
        pathname: `/images/${process.env.CMS_PROJECT_ID}/${process.env.CMS_DATASET}/*`,
        protocol: 'https',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
  webpack(config) {
    // #region SVGR
    // see https://github.com/vercel/next.js/issues/48177 regarding SVGR Issue
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/, // *.svg?url
        test: /\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
              expandProps: true,
              exportType: 'default',
              memo: false,
              ref: false,
              svgProps: {
                className: '{props.className ?? props.class ?? undefined}',
                color: "{props.color ?? 'currentColor'}",
                fill: "{props.fill ?? 'currentColor'}",
                role: 'img',
              },
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  'prefixIds',
                  'removeDimensions',
                  {
                    name: 'sortAttrs',
                    params: {
                      xmlnsOrder: 'alphabetical',
                    },
                  },
                ],
              },
              typescript: true,
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    // #endregion SVGR

    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
