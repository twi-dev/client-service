const isArray = Array.isArray

/*
 * Creates a new array with all sub-array elements concatted into it recursively
 */
function arrayFlat(...array) {
  const step = (prev, next) => (
    [...prev, ...(isArray(next) ? arrayFlat(...next) : [next])]
  )

  return array.reduce(step, [])
}

export default arrayFlat
