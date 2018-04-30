import iterator from "core/helper/iterator/objectIterator"

function objectMap(iterable, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator.entries(iterable)) {
    res[key] = cb.call(ctx, value, key, iterable)
  }

  return res
}

export default objectMap
