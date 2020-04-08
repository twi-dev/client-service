import isFunction from "lodash/isFunction"

/**
 * Creates decorator for a function, class or method
 * using given function as implementation
 *
 * @param {Function} decorator – decorator implementation
 *
 * @return {Function}
 */
const createDecorator = decorator => (...args) => {
  const [target, , descriptor] = args

  // Decorator was applied to:
  // ... a function or a class
  if (isFunction(target) && args.length === 1) {
    return decorator(target)
  }

  // ... a punlic instance property
  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    // ... a regular public method of a class
    const fn = descriptor.value

    descriptor.value = decorator(fn)
  }

  return descriptor
}

export default createDecorator
