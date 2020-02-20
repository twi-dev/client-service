const Favicon = require("favicons-webpack-plugin")

const favicon = () => new Favicon({
  logo: "../src/svg/layout/logo.svg",
  prefix: "img/icon/[hash]/",
  title: "Twi"
})

module.exports = favicon
