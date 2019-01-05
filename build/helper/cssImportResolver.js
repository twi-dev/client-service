const {relative, join} = require("path")

// TODO: Improve resolver
function cssImportResolver(id, current, options) {
  return join(relative(current, options.root), id)
}

module.exports = cssImportResolver
