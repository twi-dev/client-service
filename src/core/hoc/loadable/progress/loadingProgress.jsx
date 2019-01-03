import {createElement as h} from "react"
import {bool} from "prop-types"

import isFunction from "lodash/isFunction"

const loadingProgress = Target => {
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(Target)) {
      throw new TypeError("Target component must be a function.")
    }
  }

  const LoadingProgress = ({pastDelay}) => pastDelay ? h(Target) : null

  LoadingProgress.propTypes = {
    pastDelay: bool.isRequired,
  }

  return LoadingProgress
}

export default loadingProgress
