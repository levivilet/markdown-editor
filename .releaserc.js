module.exports = {
  plugins: [
    [
      '@semantic-release/github',
      {
        assets: [
          {
            name: 'markdown-editor-amd64.deb',
            path: 'out/make/deb/x64',
          },
        ],
      },
    ],
  ],
}
