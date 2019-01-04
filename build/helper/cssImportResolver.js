const {relative, join} = require("path")

// TODO: Improve resolver
function cssImportResolver(id, current, options) {
  // console.log(id, current, join(relative(current, options.root), id))
  return join(relative(current, options.root), id)
}

module.exports = cssImportResolver
