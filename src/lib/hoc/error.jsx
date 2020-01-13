import {createElement, Component} from "react"
import {node} from "prop-types"

import getName from "lib/helper/component/getName"

function createErrorBoundary(Target) {
  class Error extends Component {
    static displayName = `Error(${getName(Target)})`

    static propTypes = {
      children: node.isRequired
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
      if (error instanceof Promise) {
        throw error
      }

      return createElement(Target, {error})
    }
  }

  return Error
}

export default createErrorBoundary
