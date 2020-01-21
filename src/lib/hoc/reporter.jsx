import {createElement as h} from "react"
import {instanceOf} from "prop-types"

import isFunction from "lodash/isFunction"

import ApplicationError from "lib/component/Error/ApplicationError"

/**
 * Match errors using a given function.
 * the function must return a component (as a function or class) or nullish
 * value when no errors matched. In this case ApplicationError will be returned.
 *
 * @param {(error: Error) => Component} matcher – errors matcher which is
 *   returns a Reporter or nullish value
 *
 * @return {Reporter}
 */
const createErrorReporter = matcher => {
  function ErrorReporter({error}) {
    if (!isFunction(matcher)) {
      return h(ApplicationError, {error})
    }

    const Reporter = matcher(error)

    if (!isFunction(Reporter)) {
      return h(ApplicationError, {error})
    }

    return h(Reporter, {error})
  }

  ErrorReporter.propTypes = {
    error: instanceOf(Error).isRequired
  }

  return ErrorReporter
}

export default createErrorReporter
