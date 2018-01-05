const {DefinePlugin} = require("webpack")

const define = ({name}) => new DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(name)
  }
})

module.exports = define
