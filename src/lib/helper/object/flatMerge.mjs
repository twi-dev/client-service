import iterator from "lib/helper/iterator/objectIterator"

const isArray = Array.isArray

/**
 * Merge all objects into the first one.
 *
 * @param {object} target
 * @param {object[]} ...sources
 *
 * @return {object}
 */
function objectFlatMerge(target, ...sources) {
  target || (target = {})

  while (true) {
    if (sources.length === 0) {
      break
    }

    const source = sources.shift()

    // Ignore all nullish values and array-like objects
    if (source == null || isArray(target)) {
      continue
    }

    for (const [key, value] of iterator(source).entries()) {
      if (value != null) {
        target[key] = value
      }
    }
  }

  return target
}

export default objectFlatMerge
