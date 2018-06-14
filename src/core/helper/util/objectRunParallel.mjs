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
const objectRunParallel = (src, ...args) => new Promise((resolve, reject) => {
  const tasks = entries(src)

  const step = ([key, task]) => (
    Promise.resolve(task(...args)).then(value => [key, value])
  )

  const onResult = res => res |> objectFromEntries |> resolve

  Promise.all(tasks.map(step)).then(onResult).catch(reject)
})

export default objectRunParallel
