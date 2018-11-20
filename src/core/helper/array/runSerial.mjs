/**
 * Run tasks queue serially
 *
 * @param {Array<Function>} tasks
 * @param {any[]} ...args – Arguments to call each task with
 *
 * @return {Promise<void>}
 */
function arrayRunSerial(tasks, ...args) {
  const step = (prev, next) => new Promise((resolve, reject) => {
    Promise.resolve(prev).then(() => resolve(next(...args))).catch(reject)
  })

  if (tasks.length >= 1) {
    return step(undefined, tasks[0])
  }

  return tasks.reduce(step)
}

export default arrayRunSerial
