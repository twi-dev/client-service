const {safeLoad} = require("js-yaml")

function yaml(source) {
  this.cachable && this.cachable()

  const cb = this.async()

  try {
    const res = safeLoad(source)

    return cb(null, `module.exports = ${JSON.stringify(res, null, 2)}`)
  } catch (err) {
    return cb(err)
  }
}

module.exports = yaml
