const babel = () => ({
  test: /\.(m?js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    babelrc: true
  }
})

module.exports = babel
