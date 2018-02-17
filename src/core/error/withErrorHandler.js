import {h, Component} from "preact"

import isFunction from "lodash/isFunction"

const withErrorHandler = errorComponent => Target => {
  const name = Target.displayName || Target.name || "Unknown"

  class ErrorHandler extends Component {
    static displayName = `ErrorHandler(${name})`

    state = {
      error: null
    }

    __onError = error => void this.setState({error})

    render() {
      const {error} = this.state

      if (error) {
        return h(errorComponent, {error})
      }

      return h(Target, {
        ...this.props, onError: this.__onError
      })
    }
  }

  if (isFunction(Target.getInitialProps)) {
    ErrorHandler.getInitialProps = Target.getInitialProps
  }

  return ErrorHandler
}

export default withErrorHandler
