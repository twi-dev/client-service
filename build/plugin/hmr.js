const HMR = require("webpack").HotModuleReplacementPlugin

const hmr = ({dev}) => dev ? new HMR() : null

module.exports = hmr
