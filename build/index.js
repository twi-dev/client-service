const name = process.env.NODE_ENV || "development"

const dev = name !== "production"
const test = name === "test"
const debug = name === "debug"

module.exports = require("./config")({dev, test, debug, name})
