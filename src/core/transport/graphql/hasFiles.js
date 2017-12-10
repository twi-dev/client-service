import isPlainObject from "lodash/isPlainObject"

import objectIterator from "core/helper/iterator/objectIterator"

const isArray = Array.isArray

/**
 * Check if the given iterable has File or FileList inside
 *
 * @param {array | object} iterable
 *
 * @return {boolean}
 */
function hasFiles(iterable) {
  for (const value of objectIterator(iterable)) {
    if (isArray(value) || isPlainObject(value)) {
      if (hasFiles(value)) {
        return true
      }
    } else if (value instanceof File || value instanceof FileList) {
      return true
    }
  }

  return false
}

export default hasFiles
