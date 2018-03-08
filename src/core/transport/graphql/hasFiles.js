import iterator from "core/helper/iterator/objectIterator"

import isPlainObject from "lodash/isPlainObject"

const isArray = Array.isArray

function hasFiles(iterable) {
  for (const value of iterator(iterable)) {
    if (isPlainObject(value) || isArray(value)) {
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
