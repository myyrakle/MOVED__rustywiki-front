module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://125.133.80.144:11111/:path*', // The :path parameter isn't used here so will be automatically passed in the query
      },
    ];
  },
};
