import {createElement as h, Component} from "react"
import {shape, func} from "prop-types"

import isFunction from "lodash/isFunction"

import getName from "core/helper/component/getName"

import applicaitonErrorConsumer from "./application/applicaitonErrorConsumer"

/**
 * @api private
 */
const createErrorHandlerProvider = Provider => Target => {
  class ErrorHandlerProvider extends Component {
    static displayName = `ErrorHandlerProvider(${getName(Target)})`

    static propTypes = {
      applicationError: shape({report: func.isRequired}).isRequired
    }

    __reporters = new Map()

    state = {
      component: null
    }

    setReporter = (id, reporter) => this.__reporters.set(id, reporter)

    hasReporter = id => this.__reporters.has(id)

    deleteReporter = id => this.__reporters.delete(id)

    catchError = ({error, info, id = null} = {}) => {
      if (!(id || this.__reporters.size > 0 || this.__reporters.has(id))) {
        return void this.props.applicationError.report({error, info})
      }

      const reporter = this.__reporters.get(id)

      if (!isFunction(reporter)) {
        return void this.props.applicationError.report({error, info})
      }

      const component = reporter({error, info})

      if (component == null) {
        return void this.props.applicationError.report({error, info})
      }

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

  return applicaitonErrorConsumer(ErrorHandlerProvider)
}

export default createErrorHandlerProvider
