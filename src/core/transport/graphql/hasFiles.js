import iterator from "core/helper/iterator/objectIterator"

import isPlainObject from "lodash/isPlainObject"

const isArray = Array.isArray

function hasFiles(iterable) {
  let res = false

  for (const value of iterator(iterable)) {
    if (isPlainObject(value) || isArray(value)) {
      hasFiles(value)
    } else if (value instanceof File || value instanceof FileList) {
      return res = true
    }

    if (res === true) {
      break
    }
  }

  return res
}

export default hasFiles
