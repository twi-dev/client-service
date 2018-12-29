const isArray = Array.isArray

/*
 * Creates a new array with all sub-array elements concatinated recursively
 */
function flat(array, deph = Infinity) {
  function walk(prev, next) {
    if (isArray(next) && deph > 0) {
      return prev.concat(flat(next, deph - 1))
    }

    return prev.concat([next])
  }

  if (array.length <= 1) {
    return walk([], array[0])
  }

  return array.reduce(walk, [])
}

export default flat
