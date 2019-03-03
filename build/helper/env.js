const name = process.env.NODE_ENV || "development"
const dev = name !== "production"
const prod = name === "production"
const debug = name === "debug"
const test = name === "test"

module.exports = {name, dev, prod, test, debug}
