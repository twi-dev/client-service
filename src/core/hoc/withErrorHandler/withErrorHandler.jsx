import {h} from "preact"

import errorHandler from "../errorHandler"

const assign = Object.assign

/**
 * Inject errorHandler component to the Target
 *
 * @param {function} Target
 *
 * @return {Component}
 */
const withErrorHandler = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  const WithErrorHandler = props => h(Target, assign({}, props, {errorHandler}))

  WithErrorHandler.displayName = `WithErrorHandler(${name})`

  return WithErrorHandler
}

export default withErrorHandler
