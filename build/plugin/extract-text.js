const ExtractText = require("extract-text-webpack-plugin")

const extractText = ({dev}) => dev === false ? new ExtractText({
  filename: "css/[name]-[contenthash].css",
  disable: dev,
  allChunks: true
}) : null

module.exports = extractText
