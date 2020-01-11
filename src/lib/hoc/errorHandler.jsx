import {createElement as h} from "react"
import {instanceOf} from "prop-types"

import isFunction from "lodash/isFunction"

import ApplicationError from "lib/component/Error/ApplicationError"

/**
 * Match errors using a given function.
 * the function must return a component (as a function or class) or nullish
 * value when no errors matched. In this case ApplicationError will be returned.
 *
 * @param {(error: Error) => Reporter} matcher – errors matcher which is
 *   returns a Reporter or nullish value
 *
 * @return {Reporter}
 */
const errorHandler = matcher => {
  function ErrorHandler({error}) {
    if (!isFunction(matcher)) {
      return h(ApplicationError, {error})
    }

    const Reporter = matcher(error)

    if (!isFunction(Reporter)) {
      return h(ApplicationError, {error})
    }

    return h(Reporter, {error})
  }

  ErrorHandler.propTypes = {
    error: instanceOf(Error).isRequired
  }

  return ErrorHandler
}

export default errorHandler
