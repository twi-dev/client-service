const babel = () => ({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    babelrc: true
  }
})

module.exports = babel
