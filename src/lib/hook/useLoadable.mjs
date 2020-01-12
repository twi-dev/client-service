import eq from "fast-deep-equal"

import serial from "lib/helper/object/runSerial"
import parallel from "lib/helper/object/runParallel"

const cache = []

/**
 * Creates a suspender from given object of tasks.
 * EXPERIMENTAL!!!
 *
 * @param {{[key: string]: Function}} tasks
 * @param {object} [options = {}]
 *
 * @return {any}
 *
 * @throws {Promise}
 * @throws {Error}
 */
function useLoadable(tasks, options = {}) {
  const index = cache.findIndex(entry => eq(entry.tasks, tasks))

  // Try to resolve a result of an operation if found in cache
  if (index >= 0) {
    const {result, error, suspender} = cache[index]

    if (error) {
      cache.splice(index, 1)

      throw error
    }

    // Remove entry from the cache then return the result
    if (result) {
      // FIXME: I think that cache management probably must be reconsidered
      // due to the fact of how such early operation removal might affect
      // on a further Suspense-dependent components re-renders.
      // I almost thing that the closest Suspense is up the component
      // that called this function, React may call the component again
      // which will cause unnecessary operation's runs.
      cache.splice(index, 1)

      return result
    }

    // If there's no result neither error then just throw the operation again
    // since we probably still wait for the result
    throw suspender
  }

  // Decide an operation resolver type depending on options
  const run = options.serial === true ? serial : parallel

  const operation = {
    tasks,
    error: null,
    result: null,
    suspender: run(tasks)
      .then(result => { operation.result = result })

      .catch(error => { operation.error = error })
  }

  // Cache the operation
  cache.push(operation)

  // Notify React.Suspense
  throw operation.suspender
}

export default useLoadable
