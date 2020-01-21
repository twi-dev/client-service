const compiler = require("./compiler")
const getConfig = require("./config")

const name = process.env.NODE_ENV || "development"
const dev = name !== "production"
const debug = name === "debug"
const test = name === "test"

const config = getConfig({name, dev, debug, test})

compiler(config, {name, dev, debug, test})
  .then(stats => {
    console.log(String(stats))
  })

  .catch(err => {
    console.log(err)
    process.exit(1)
  })
