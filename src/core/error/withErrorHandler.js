import {h, Component} from "preact"

import isFunction from "lodash/isFunction"

// import NotFound from "core/page/error/Http/NotFound"

const withErrorHandler = errorComponent => Target => {
  const name = Target.displayName || Target.name || "Unknown"

  class ErrorHandler extends Component {
    static displayName = `ErrorHandler(${name})`

    state = {
      error: null
    }

    componentDidUpdate() {
      if (process.env.NODE_ENV !== "production" && this.state.error) {
        console.error(this.state.error.stack)
      }
    }

    __onError = error => void this.setState({error})

    render() {
      const {error} = this.state

      if (!error) {
        return h(Target, {
          ...this.props, onError: this.__onError
        })
      }

      return h(errorComponent, {error})
    }
  }

  if (isFunction(Target.getInitialProps)) {
    ErrorHandler.getInitialProps = Target.getInitialProps
  }

  return ErrorHandler
}

export default withErrorHandler
