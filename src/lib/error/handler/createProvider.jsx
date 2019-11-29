import {createElement as h, Component} from "react"
import {shape, func} from "prop-types"

import omit from "lodash/omit"
import isEmpty from "lodash/isEmpty"
import isFunction from "lodash/isFunction"

import getName from "lib/helper/component/getName"
import waterfall from "lib/helper/array/runWaterfall"
import consumer from "lib/error/application/createErrorConsumer"

const exclude = ["reporter"]

/**
 * @api private
 */
const createErrorHandlerProvider = Provider => Target => {
  @consumer class ErrorHandlerProvider extends Component {
    static displayName = `ErrorHandlerProvider(${getName(Target)})`

    static propTypes = {
      applicationError: shape({report: func.isRequired}).isRequired,
      reporter: shape({catch: func.isRequired, set: func.isRequired})
    }

    static defaultProps = {
      reporter: null
    }

    __reporters = new Map()

    state = {
      component: null
    }

    setReporter = (id, fns) => {
      if (isFunction(fns)) {
        fns = [fns]
      }

      if (this.__reporters.has(id) === false) {
        this.__reporters.set(id, Array.from(new Set(fns)))
      }

      const reporters = this.__reporters.get(id)

      reporters.push(...fns)
      this.__reporters.set(Array.from(new Set(reporters)))
    }

    hasReporter = id => this.__reporters.has(id)

    deleteReporter = (id, reporter) => {
      // Remove all reporters for given ID when no function was specified
      if (!reporter) {
        return void this.__reporters.delete(id)
      }

      const reporters = this.__reporters.get(id)

      if (reporters) {
        if (reporters.includes(reporter) === false) {
          this.__reporters.delete(id)
        } else {
          this.__reporters.set(id, reporters.filter(fn => fn !== reporter))
        }
      }
    }

    catchError = ({error, info, id} = {}, reporter) => {
      let reporters = this.__reporters.get(id)

      if (isEmpty(reporters)) {
        return void this.props.applicationError.report({error, info})
      }

      if (reporter) {
        reporters = reporters.filter(fn => fn === reporter)
      }

      async function runReporters() {
        for (const fn of reporters) {
          const component = await fn({error, info})

          if (isFunction(component)) {
            return component
          }
        }

        return null
      }

      const setComponent = component => {
        // If there is no matched component, try to pass error
        // up to the components hierarchy
        if (component == null) {
          if (this.props.reporter) {
            this.props.reporter.catch({error, info})
          } else {
            this.props.applicationError.report({error, info})
          }

          return undefined
        }

        this.setState(() => ({component}))
      }

      const onRejected = err => this.props.applicationError.report({error: err})

      waterfall([runReporters, setComponent]).catch(onRejected)
    }

    render() {
      const props = omit(this.props, exclude)

      const value = {
        set: this.setReporter,
        has: this.hasReporter,
        delete: this.deleteReporter,
        catch: this.catchError
      }

      if (!this.state.component) {
        return h(
          Provider, {value},

          h(Target, props)
        )
      }

      return h(this.state.component, props)
    }
  }

  return ErrorHandlerProvider
}

export default createErrorHandlerProvider
