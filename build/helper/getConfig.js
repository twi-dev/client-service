const {readFileSync} = require("fs")
const {join} = require("path")

const {safeLoad} = require("js-yaml")

const freezee = require("js-flock/deepFreeze")
const merge = require("lodash/merge")

const ROOT = join(__dirname, "..", "..")

const getConfig = ({name}) => {
  const defConf = safeLoad(readFileSync(join(ROOT, "config", "default.yaml")))

  let envConf = {}
  try {
    envConf = safeLoad(readFileSync(join(ROOT, "config", `${name}.yaml`)))
  } catch (err) {
    if (name === "production") {
      throw err
    }
  }

  return freezee(merge({}, defConf, envConf))
}

module.exports = getConfig
