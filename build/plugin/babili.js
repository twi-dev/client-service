const Babili = require("babili-webpack-plugin")

const babili = ({dev}) => dev === false ? new Babili() : null

module.exports = babili
