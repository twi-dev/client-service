const getConfig = require("./config")

const name = process.env.NODE_ENV || "development"

const createConfig = (env = name, argv) => getConfig({
  dev: env !== "production",
  debug: env === "debug",
  test: env === "test",
  name: env,
}, argv)

module.exports = createConfig
