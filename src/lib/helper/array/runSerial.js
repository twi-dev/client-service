const isArray = Array.isArray

/**
 * Run tasks queue serially
 *
 * @param {Array<Function>} tasks
 * @param {any[]} ...args – Arguments to call each task with
 *
 * @return {Promise<void>}
 */
function arrayRunSerial(tasks, args = []) {
  if (!isArray(tasks)) {
    return Promise.reject(new TypeError("Tasks must be passed as an array."))
  }

  const step = (prev, next) => Promise.resolve(prev).then(() => next(...args))

  if (tasks.length >= 1) {
    return step(undefined, tasks[0])
  }

  return tasks.reduce(step)
}

export default arrayRunSerial
