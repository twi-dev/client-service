const Favicon = require("favicons-webpack-plugin")

const favicon = () => new Favicon({
  logo: "../src/common/svg/layout/logo.svg",
  prefix: "img/icons-[hash]/",
  title: "Twi"
})

module.exports = favicon
