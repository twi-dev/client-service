const {NamedModulesPlugin} = require("webpack")

const named = ({dev}) => dev ? new NamedModulesPlugin() : null

module.exports = named
