import iterator from "core/helper/iterator/objectIterator"

const isArray = Array.isArray

/**
 * Merge all sources objects with first given object. From left to the right.
 *
 * @param {object} object
 * @param {object[]} ...sources
 *
 * @return {object}
 */
function objectFlatMerge(object, ...sources) {
  object || (object = {})

  while (true) {
    if (sources.length === 0) {
      break
    }

    const source = sources.shift()

    // Ignore all nullish values and array-like objects
    if (source == null || isArray(object)) {
      continue
    }

    for (const [key, value] of iterator(source).entries()) {
      if (value != null) {
        object[key] = value
      }
    }
  }

  return object
}

export default objectFlatMerge
