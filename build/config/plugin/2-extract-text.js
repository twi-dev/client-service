const ExtractText = require("mini-css-extract-plugin")

const extractText = ({dev}) => dev ? null : new ExtractText({
  filename: "css/[name]-[hash].css",
  chunkFilename: "css/[name]-[hash].css"
})

module.exports = extractText
