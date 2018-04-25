const Babili = require("babel-minify-webpack-plugin")

const babili = ({dev}) => dev ? null : new Babili(undefined, {comments: false})

module.exports = babili
