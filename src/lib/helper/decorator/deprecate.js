import create from "./createDecorator"

const deprecate = message => create(fn => {
  let called = false

  return function decorator(...args) {
    if (!called) {
      console.warn("Deprecation warning %s", message)

      called = true
    }

    fn.call(this, ...args)
  }
})

export default deprecate
