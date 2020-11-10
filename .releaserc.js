module.exports = {
  plugins: [
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'make/deb/x64',
            label: 'Ubuntu Distribution',
          },
        ],
      },
    ],
  ],
}
