const step = (prev, next) => new Promise((resolve, reject) => {
  Promise.resolve(prev).then(res => resolve(next(res))).catch(reject)
})

function arrayWaterfall(tasks, initial) {
  if (tasks.length <= 1) {
    const [task] = tasks

    return step(initial, task)
  }

  return tasks.reduce(step, initial)
}

export default arrayWaterfall
