const {resolve} = require("path")

const yaml = () => ({
  test: /\.(yaml|yml)$/,
  exclude: /node_modules/,
  include: resolve("data"),
  loader: "yaml-loader"
})

module.exports = yaml
