import objectFromEntries from "object-deep-from-entries"

const entries = Object.entries

/**
 * Run tasks in object serially
 * @param {object} object
 * @param {any[]} ...args
 *
 * @return {Promise<object>}
 */
const objectRunSerial = (src, ...args) => new Promise((resolve, reject) => {
  const tasks = entries(src)

  const fulfill = ([key, task]) => prev => (
    Promise.resolve(task(...args)).then(value => [...prev, [key, value]])
  )

  const step = (prev, next) => Promise.resolve(prev).then(fulfill(next))

  const onResult = res => res |> objectFromEntries |> resolve

  if (tasks.length <= 1) {
    const [task] = tasks

    return step([], task)
  }

  tasks.reduce(step, []).then(onResult).catch(reject)
})

export default objectRunSerial
