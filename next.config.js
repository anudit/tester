const CopyPlugin = require('copy-webpack-plugin');
const nextConfig = (phase, { defaultConfig }) => {

  /** @type {import('next').NextConfig} */
  const config = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          // All page routes, not the api ones
          source: '/:path((?!api).*)*',
          headers: [
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
            { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          ],
        },
      ];
    },
    webpack: (
      wconfig,
      { webpack, isServer }
    ) => {
      wconfig.output.publicPath = '/';
      wconfig.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: './node_modules/tlsn-js/build',
              to: './static/chunks/',
            },
          ],
        })
      )
      return wconfig
    },
  }

  return config;

}

module.exports = nextConfig;
