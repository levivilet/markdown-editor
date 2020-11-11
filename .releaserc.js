module.exports = {
  plugins: [
    [
      '@semantic-release/github',
      {
        assets: [
          {
            label: 'markdown-editor-amd64.deb',
            path: 'out/make/deb/x64',
          },
        ],
      },
    ],
  ],
}
