import {createElement as h, Component} from "react"
import {shape, func} from "prop-types"

import nanoid from "nanoid"

import getName from "lib/helper/component/getName"

import attachConsumer from "./attachConsumer"

/**
 * @api private
 */
const createErrorHandlerConsumer = Consumer => Target => {
  const name = getName(Target)

  class ErrorHandlerConsumer extends Component {
    static displayName = `ErrorHandlerConsumer(${name})`

    static propTypes = {
      reporter: shape({
        set: func.isRequired,
        has: func.isRequired,
        delete: func.isRequired
      }).isRequired
    }

    constructor(props) {
      super(props)

      this.__id = nanoid()
    }

    componentWillUnmount() {
      this.props.reporter.delete(this.__id)
    }

    setReporter = fns => this.props.reporter.set(this.__id, fns)

    catchError = ({error, info}) => {
      this.props.reporter.catch({error, info, id: this.__id})
    }

    render() {
      const props = {
        ...this.props,

        reporter: {
          set: this.setReporter,
          catch: this.catchError
        }
      }

      return h(Target, props)
    }
  }

  return ErrorHandlerConsumer |> attachConsumer(Consumer)
}

export default createErrorHandlerConsumer
