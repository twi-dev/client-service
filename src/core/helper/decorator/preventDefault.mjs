import isFunction from "lodash/isFunction"

const decorator = fn => function preventDefaultDecorator(event) {
  if (!isFunction(fn)) {
    fn = () => {}
  }

  event.preventDefault()
  fn.call(this, event)
}

function preventDefault(target, key, descriptor) {
  if (isFunction(target) || arguments.length <= 1) {
    return decorator(target)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    const fn = descriptor.value

    descriptor.value = decorator(fn)
  }

  return descriptor
}

export default preventDefault
