import objectFromEntries from "object-deep-from-entries"
import isPlainObject from "lodash/isPlainObject"

const entries = Object.entries

/**
 * Run tasks from given object in parallel
 *
 * @param {object} object
 * @param {any[]} ...args
 *
 * @return {Promise<object>}
 */
const objectRunParallel = (src, args = []) => new Promise((resolve, reject) => {
  if (!isPlainObject(src)) {
    return reject(new TypeError("Tasks must be an object."))
  }

  const step = ([key, task]) => (
    Promise.resolve(task(...args)).then(value => [key, value])
  )

  const onResult = res => res |> objectFromEntries |> resolve

  Promise.all(entries(src).map(step)).then(onResult).catch(reject)
})

export default objectRunParallel
