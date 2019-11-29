import iterator from "lib/helper/iterator/objectIterator"

function objectFilter(iterable, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator.entries(iterable)) {
    if (Boolean(cb.call(ctx, value, key, iterable)) === true) {
      res[key] = value
    }
  }

  return res
}

export default objectFilter
