const isArray = Array.isArray

/*
 * Creates a new array with all sub-array elements concatinated recursively
 */
function arrayFlat(array) {
  const walk = (prev, next) => (
    isArray(next) ? arrayFlat(next) : prev.concat([next])
  )

  return array.reduce(walk, [])
}

export default arrayFlat
