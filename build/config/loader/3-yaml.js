const yaml = () => ({
  test: /\.ya?ml$/,
  exclude: /node_modules/,
  loader: "yaml-loader"
})

module.exports = yaml
