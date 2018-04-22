import {h} from "preact"
import {bool, instanceOf} from "prop-types"

import isFunction from "lodash/isFunction"

const loadingProcess = ({onLoading, onError} = {}) => {
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(onLoading)) {
      throw new TypeError("onLoading component must be a function.")
    }

    if (!isFunction(onError)) {
      throw new TypeError("onError component must be a function.")
    }
  }

  function LoadingProcess({pastDelay, timedOut, error}) {
    if (error) {
      return h(onError, {error})
    }

    // Make it configurable
    if (timedOut) {
      return <div>Loading is taking a long time...</div>
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
