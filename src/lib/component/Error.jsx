import {createElement, Component} from "react"
import {node, func} from "prop-types"

import isObject from "lodash/isObject"
import isFunction from "lodash/isFunction"

class ErrorBoundary extends Component {
  static propTypes = {
    children: node.isRequired,
    reporter: func.isRequired
  }

  static getDerivedStateFromError = error => ({error})

  componentDidCatch(error, info) {
    console.error(error)

    if (process.env.NODE_ENV !== "production" && info) {
      console.error(info)
    }
  }

  render() {
    const {error} = this.state

    if (!error) {
      return this.props.children
    }

    // Throw suspenders further
    if (
      error instanceof Promise || (isObject(error) && isFunction(error.then))
    ) {
      throw error
    }

    return createElement(this.props.reporter, {error})
  }
}

export default ErrorBoundary
