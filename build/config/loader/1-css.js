const extract = require("extract-text-webpack-plugin").extract

const cssnext = require("postcss-cssnext")
const use = require("postcss-use")
const lost = require("lost")

const getLocalName = dev => ([
  dev ? "[name]__[local]___" : null,
  "[hash:base64:12]"
]).join("")

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
})

module.exports = css
