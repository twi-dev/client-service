const Html = require("html-webpack-plugin")

const html = () => new Html({
  template: "base/main.html",
  filename: "../index.html", // Realtive to "src" dir. (Dest path)
  inject: "body",
  alwaysWriteToDisk: true
})

module.exports = html
