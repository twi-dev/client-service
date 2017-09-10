const babel = () => ({
  test: /\.jsx?$/,
  loader: "babel-loader",
  options: {
    babelrc: true
  }
})

module.exports = babel
