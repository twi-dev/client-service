import iterator from "lib/helper/iterator/objectIterator"

function objectFilter(iterable, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator.entries(iterable)) {
    if (cb.call(ctx, value, key, iterable)) {
      res[key] = value
    }
  }

  return res
}

export default objectFilter
