import isPlainObject from "lodash/isPlainObject"

import iterator from "lib/helper/iterator/objectIterator"

const isArray = Array.isArray

/**
 * Walk through object recursively
 *
 * @param {object | array} iterable – an object or array to walk through
 * @param {object | array} slice - an object or array slice of current level
 * @param {function} cb – a callback function to execute on each scalar value
 * @param {any} ctx
 *
 * @return {object | array}
 */
function walk(iterable, slice, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator.entries(iterable)) {
    if (isPlainObject(value) || isArray(value)) {
      res[key] = walk(value, slice, cb, ctx)
    } else {
      res[key] = cb.call(ctx, value, key, slice, iterable)
    }
  }

  return res
}

const objectDeepMap = (iterable, cb, ctx) => walk(iterable, iterable, cb, ctx)

export default objectDeepMap
