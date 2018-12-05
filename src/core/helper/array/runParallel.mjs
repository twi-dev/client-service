const isArray = Array.isArray

function runParallel(tasks, args = []) {
  if (!isArray(tasks)) {
    return Promise.reject(new TypeError("Tasks must be passed as an array."))
  }

  return Promise.all(tasks.map(task => task(...args)))
}

export default runParallel
