import {createElement as h} from "react"
import {bool, instanceOf} from "prop-types"

import isFunction from "lodash/isFunction"

import TimeoutError from "core/component/Error/TimeoutError"

const loadingProcess = ({onLoading, onError, onTimeout} = {}) => {
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(onLoading)) {
      throw new TypeError("onLoading component must be a function.")
    }

    if (!isFunction(onError)) {
      throw new TypeError("onError component must be a function.")
    }
  }

  if (!isFunction(onTimeout)) {
    onTimeout = TimeoutError
  }

  function LoadingProcess({pastDelay, timedOut, error}) {
    if (error) {
      return h(onError, {error})
    }

    if (timedOut) {
      return h(onTimeout, {error})
    }

    if (!pastDelay) {
      return null
    }

    return h(onLoading)
  }

  LoadingProcess.propTypes = {
    pastDelay: bool.isRequired,
    timedOut: bool.isRequired,
    error: instanceOf(Error)
  }

  LoadingProcess.defaultProps = {
    error: null
  }

  return LoadingProcess
}

export default loadingProcess
