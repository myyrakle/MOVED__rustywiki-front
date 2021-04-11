const withCSS = require('@zeit/next-css');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = withCSS({
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://125.133.80.144:11111/:path*', // The :path parameter isn't used here so will be automatically passed in the query
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    config.plugins.push(
      new MonacoEditorWebpackPlugin({
        languages: ['markdown'],
        filename: 'static/[name].worker.js',
      })
    );
    return config;
  },
});
