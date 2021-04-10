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
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes('_app')
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }

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
