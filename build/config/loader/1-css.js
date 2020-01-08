const {loader} = require("mini-css-extract-plugin")

const getLocalIdentName = dev => (
  [dev && "[path][name]_[local]-", "[hash:base64:5]"]
    .filter(Boolean)
    .join("")
)

const css = ({dev}) => ({
  test: /\.s?css$/,
  exclude: /node_modules/,
  use: [
    dev ? "style-loader" : loader,
    {
      loader: "css-loader",
      options: {
        esModule: true,
        importLoaders: 1,
        localsConvention: "camelCase",
        modules: {
          localIdentName: getLocalIdentName(dev)
        }
      }
    },
    "postcss-loader"
  ]
})

module.exports = css
