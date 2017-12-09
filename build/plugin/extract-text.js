const ExtractText = require("extract-text-webpack-plugin")

const extractText = ({dev}) => new ExtractText({
  filename: "css/[name]-[contenthash].css",
  disable: dev,
  allChunks: true
})

module.exports = extractText
