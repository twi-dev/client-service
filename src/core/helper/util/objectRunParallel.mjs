import objectFromEntries from "object-deep-from-entries"

const entries = Object.entries

/**
 * Run tasks from given object in parallel
 *
 * @param {object} object
 * @param {any[]} ...args
 *
 * @return {Promise<object>}
 */
function objectRunParallel(object, ...args) {
  const tasks = entries(object)

  const fulfill = ([key, task]) => task(...args).then(value => [key, value])

  return Promise.all(tasks.map(fulfill)).then(objectFromEntries)
}

export default objectRunParallel
