import {createElement as h, Component} from "react"
import {shape, func} from "prop-types"

import nanoid from "nanoid"

import getName from "core/helper/component/getName"

import attachConsumer from "./attachConsumer"

const createErrorHandlerConsumer = Consumer => Target => {
  const name = getName(Target)

  class ErrorHandlerConsumer extends Component {
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

    setReporter = reporter => {
      if (this.props.reporter.has(this.__id) === false) {
        return this.props.reporter.set(this.__id, reporter)
      }

      if (process.env.NODE_ENV !== "production") {
        console.warn("Error reporter can be sen only once per consumer.")
        console.warn(
          "Check the %s#componentDidMount or %s constructor " +
          "and remove extra reporter.set( ... ) call(s).", name, name
        )
      }
    }

    catchError = (error, info) => {
      this.props.reporter.catch({error, info, id: this.__id})
    }

    componentDidUnmount() {
      this.props.reporter.delete(this.__id)
    }

    componentDidCatch(error, info) {
      this.props.reporter.catch({error, info, id: this.__id})
    }

    render() {
      const props = {
        ...this.props,

        set: this.setReporter,
        catch: this.catchError
      }

      return h(Target, props)
    }
  }

  ErrorHandlerConsumer.displayName = `ErrorHandlerConsumer(${name})`

  return ErrorHandlerConsumer |> attachConsumer(Consumer)
}

export default createErrorHandlerConsumer
