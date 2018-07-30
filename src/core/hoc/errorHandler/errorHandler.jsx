import {createElement as h} from "react"
import {instanceOf} from "prop-types"

import isFunction from "lodash/isFunction"

import ApplicationError from "core/page/error/ApplicationError"

/**
 * Match errors using a given function.
 * the function must return a component (as a function or class) or nullish
 * value when no errors matched. In this case ApplicationError will be returned.
 *
 * @param {(err: Error) => Component} matcher – errors matcher which is
 *   must return a component or nullish value
 *
 * @return {Component}
 */
const errorHandler = matcher => {
  function ErrorHandler({error}) {
    if (!isFunction(matcher)) {
      return h(ApplicationError, {error})
    }

    const Component = matcher(error)

    if (!isFunction(Component)) {
      return h(ApplicationError, {error})
    }

    return h(Component, {error})
  }

  ErrorHandler.propTypes = {
    error: instanceOf(Error).isRequired
  }

  return ErrorHandler
}

export default errorHandler
