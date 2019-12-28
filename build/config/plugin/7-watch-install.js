const {join} = require("path")

const Watch = require("react-dev-utils/WatchMissingNodeModulesPlugin")

const watch = () => new Watch(join(__dirname, "..", "..", "..", "node_modules"))

module.exports = watch
