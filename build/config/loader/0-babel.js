const babel = () => ({
  type: "javascript/auto",
  test: /\.(m?js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    babelrc: true
  }
})

module.exports = babel
