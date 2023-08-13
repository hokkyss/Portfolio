/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
    typedRoutes: true,
  },
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
              ref: true,
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
                ],
              },
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

module.exports = nextConfig;
