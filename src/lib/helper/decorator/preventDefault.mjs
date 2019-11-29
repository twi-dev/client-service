import isFunction from "lodash/isFunction"

/**
 * Decorate given event handler and return the new one which is calls
 * event.peventDefault method before handler.
 *
 * @param {(event: Event) => void} handler
 *
 * @return {(event: Event) => void} preventDefaultDecorator
 */
const decorator = handler => function preventDefaultDecorator(event) {
  if (!isFunction(handler)) {
    handler = () => {}
  }

  event.preventDefault()
  handler.call(this, event)
}

/**
 * Decorator given event handler and call event.preventDefault() before it.
 * You can decorator a function or class method.
 *
 * Note: if called with a function or without any arguments, it just returns
 * a new event handler that calls preventDefault and then given function.
 *
 * @param {object | function} [target = undefined] – an event hanlder
 *  or target object
 * @param {string} [key = undefined] – property name
 * @param {object} [descriptor = undefined] – a JavaScript property descriptor
 */
function preventDefault(target, key, descriptor) {
  if (isFunction(target) || arguments.length === 1) {
    return decorator(target)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    const handler = descriptor.value

    descriptor.value = decorator(handler)
  }

  return descriptor
}

export default preventDefault
