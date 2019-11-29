import objectFromEntries from "object-deep-from-entries"
import isPlainObject from "lodash/isPlainObject"

const entries = Object.entries

/**
 * Run tasks in object serially
 * @param {object} object
 * @param {any[]} ...args
 *
 * @return {Promise<object>}
 */
const objectRunSerial = (src, args = []) => new Promise((resolve, reject) => {
  if (!isPlainObject(src)) {
    return reject(new TypeError("Tasks must be an object."))
  }

  const fulfill = ([key, task]) => prev => (
    Promise.resolve(task(...args)).then(value => [...prev, [key, value]])
  )

  const step = (prev, next) => Promise.resolve(prev).then(fulfill(next))

  const onResult = res => res |> objectFromEntries |> resolve

  const tasks = entries(src)

  if (tasks.length <= 1) {
    const [task] = tasks

    return step([], task).then(onResult).catch(reject)
  }

  tasks.reduce(step, []).then(onResult).catch(reject)
})

export default objectRunSerial
