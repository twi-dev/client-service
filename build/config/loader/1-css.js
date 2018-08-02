const {loader} = require("mini-css-extract-plugin")

const getLocalName = dev => ([
  dev ? "[name]__[local]___" : null,
  "[hash:base64:12]"
]).join("")

const css = ({dev}) => ({
  test: /\.(sss|css)$/,
  exclude: /node_modules/,
  use: [
    dev ? "style-loader" : loader,
    {
      loader: "css-loader",
      options: {
        modules: true,
        camelCase: true,
        localIdentName: getLocalName(dev)
      }
    },
    "postcss-loader"
  ]
})

module.exports = css
