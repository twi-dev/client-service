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
    },
    {
      loader: "svgo-loader",
      options: {
        plugins: [
          {
            convertColors: {
              shorthex: true
            }
          },
          {
            removeComments: true
          },
          {
            // Should be FALSE because of "viewBox" needed for image scale
            removeViewBox: false
          }
        ]
      }
    }
  ]
})

module.exports = svg
