module.exports = {
  plugins: [
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'out/make/deb/x64',
          },
        ],
      },
    ],
  ],
}
