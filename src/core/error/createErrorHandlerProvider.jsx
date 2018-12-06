import {createElement as h, Component} from "react"

import getName from "core/helper/component/getName"

const createErrorHandlerProvider = Provider => Target => {
  class ErrorHandlerProvider extends Component {
    static displayName = `ErrorHandlerProvider(${getName(Target)})`

    __reporters = new Map()

    state = {
      component: null
    }

    setReporter = (id, reporter) => this.__reporters.set(id, reporter)

    hasReporter = id => this.__reporters.has(id)

    deleteReporter = id => this.__reporters.delete(id)

    catchError = ({error, info, id = null} = {}) => {
      const reporter = do {
        if (id && this.__reporters.size > 0 && this.__reporters.has(id)) {
          this.__reporters.get(id)
        } else {
          // TODO: Add default reporter
          () => null
        }
      }

      // TODO: Check if returned component is a function
      const component = reporter({error, info})

      this.setState(() => ({component}))
    }

    componentDidCatch(error, info) {
      this.catchError({error, info})
    }

    render() {
      const value = {
        set: this.setReporter,
        has: this.hasReporter,
        delete: this.deleteReporter,
        catch: this.catchError
      }

      if (!this.state.component) {
        return h(
          Provider, {value},

          h(Target, this.props)
        )
      }

      return h(this.state.component, this.props)
    }
  }

  return ErrorHandlerProvider
}

export default createErrorHandlerProvider
