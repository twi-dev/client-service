import isFunction from "lodash/isFunction"

import create from "./createDecorator"

/**
 * Decorate given event handler and return the new one which is calls
 * event.peventDefault method before handler.
 *
 * @param {(event: Event) => void} handler
 *
 * @return {(event: Event) => void} decorator
 */
const preventDefault = create(handler => function decorator(event, ...args) {
  event.preventDefault()

  if (isFunction(handler)) {
    handler.call(this, event, ...args)
  }
})

export default preventDefault
