const yaml = () => ({
  test: /\.(yaml|yml)$/,
  exclude: /node_modules/,
  use: ["json-loader", "yaml-loader"]
})

module.exports = yaml
