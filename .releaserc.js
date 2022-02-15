module.exports = {
  branches: ["master", "main"],
  plugins: [
    [
      "@semantic-release/github",
      {
        assets: [
          {
            label: "markdown-editor-amd64.deb",
            path: "out/make/deb/x64/markdown-editor_1.0.0_amd64.deb",
          },
        ],
      },
    ],
  ],
};
