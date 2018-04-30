import iterator from "core/helper/iterator/objectIterator"

function objectMapToArrayTasks(iterable, cb, ctx = null) {
  const res = []

  for (const [key, value] of iterator.entries(iterable)) {
    res.push(cb.call(ctx, value, key, iterable))
  }

  return res
}

export default objectMapToArrayTasks
