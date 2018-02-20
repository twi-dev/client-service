const Babili = require("babel-minify-webpack-plugin")

const babili = ({dev}) => !dev ? new Babili(undefined, {comments: false}) : null

module.exports = babili
