const Html = require("html-webpack-plugin")

const html = () => new Html({
  title: "Twi",
  template: "core/base/main.html",
  filename: "../index.html", // Realtive to "src" dir. (Dest path)
  inject: "body",
  alwaysWriteToDisk: true
})

module.exports = html
