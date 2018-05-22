import objectFromEntries from "object-deep-from-entries"

const entries = Object.entries

/**
 * Run tasks in object serially
 * @param {object} object
 * @param {any[]} ...args
 *
 * @return {Promise<object>}
 */
function objectSerial(object, ...args) {
  const fulfill = ([key, task]) => prev => (
    Promise.resolve(task(...args)).then(value => [...prev, [key, value]])
  )

  const reducer = (prev, next) => prev.then(fulfill(next))

  const tasks = entries(object)

  return tasks.reduce(reducer, Promise.resolve([])).then(objectFromEntries)
}

export default objectSerial
