const isArray = Array.isArray

/**
 * @private
 */
const step = (prev, next) => new Promise((resolve, reject) => {
  Promise.resolve(prev).then(res => resolve(next(res))).catch(reject)
})

/**
 * @param {Array<(prev: any) => Promise<any>>}
 * @param {any} [initial = undefined] - initial value to execute the first task
 *
 * @return {Promise<any>} - result of the last executed task
 *
 * @throws {TypeError} when tasks given in a wrong type
 */
function arrayWaterfall(tasks, initial) {
  if (!isArray(tasks)) {
    return Promise.reject(new TypeError("Tasks must be passed as an array."))
  }

  if (tasks.length <= 1) {
    const [task] = tasks

    return step(initial, task)
  }

  return tasks.reduce(step, initial)
}

export default arrayWaterfall
