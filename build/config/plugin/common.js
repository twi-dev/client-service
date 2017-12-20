const CommonsChunkPlugin = require("webpack").optimize.CommonsChunkPlugin

const common = ({dev}) => dev ? null : new CommonsChunkPlugin({
  name: "vendor", minChunks: ({resource}) => /node_modules/.test(resource)
})

module.exports = common
