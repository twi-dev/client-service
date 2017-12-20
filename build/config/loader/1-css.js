const extract = require("extract-text-webpack-plugin").extract
const autoprefixer = require("autoprefixer")

const css = ({dev}) => ({
  test: /\.(sss|css)$/,
  exclude: /node_modules/,
  use: extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: {
          modules: true,
          camelCase: true,
          minimize: dev === false,
          localIdentName: "[name]__[local]___[hash:base64:12]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          parser: "sugarss",
          sourceMap: dev === false,
          plugins: [
            autoprefixer
          ]
        }
      }
    ]
  })
})

module.exports = css
