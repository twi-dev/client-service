// const {extract} = require("extract-text-webpack-plugin")
const {loader} = require("mini-css-extract-plugin")

const cssnext = require("postcss-cssnext")
const use = require("postcss-use")
const lost = require("lost")
const atImport = require("postcss-import")

const getLocalName = dev => ([
  dev ? "[name]__[local]___" : null,
  "[hash:base64:12]"
]).join("")

const css = ({dev}, options) => ({
  test: /\.(sss|css)$/,
  exclude: /node_modules/,
  use: [
    dev ? "style-loader" : loader,
    {
      loader: "css-loader",
      options: {
        modules: true,
        camelCase: true,
        minimize: dev === false,
        localIdentName: getLocalName(dev)
      }
    },
    {
      loader: "postcss-loader",
      options: {
        parser: "sugarss",
        sourceMap: dev === false,
        plugins: [
          use({
            resolveFromFile: true,
            modules: "*"
          }),
          lost(),
          atImport({
            root: options.root,
            path: "src"
          }),
          cssnext({
            autoprefixer: {
              browsers: [
                "last 2 years"
              ]
            }
          })
        ]
      }
    }
  ]
})

module.exports = css
