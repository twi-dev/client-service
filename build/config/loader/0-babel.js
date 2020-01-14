const babel = () => ({
  type: "javascript/auto",
  test: /\.(m?js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        babelrc: true
      }
    },
    "@open-wc/webpack-import-meta-loader"
  ],
})

module.exports = babel
