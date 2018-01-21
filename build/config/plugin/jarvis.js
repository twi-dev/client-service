const Jarvis = require("webpack-jarvis")

const jarvis = ({dev}) => dev && new Jarvis({port: 1339})

module.exports = jarvis
