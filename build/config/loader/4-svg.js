const svg = () => ({
  test: /\.svg$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        babelrc: true,
        presets: [
          ["@babel/react"]
        ]
      }
    },
    {
      loader: "react-svg-loader",
      options: {
        jsx: true
      }
    }
  ]
})

module.exports = svg
