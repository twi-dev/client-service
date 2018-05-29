const Babili = require("babel-minify-webpack-plugin")
const preset = require("babel-preset-minify")
const core = require("@babel/core")

const babili = ({dev}) => (
  dev ? null : new Babili(undefined, {
    comments: false,
    babel: core,
    minifyPreset: preset
  })
)

module.exports = babili
