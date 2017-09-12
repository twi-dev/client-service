const Html = require("html-webpack-plugin")

const html = () => new Html({
  title: "Twi",
  template: "view/container.html",
  filename: "../view/container.html",
  inject: "body",
  alwaysWriteToDisk: true
})

module.exports = html
