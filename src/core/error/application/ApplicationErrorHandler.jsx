import {createElement as h, Component} from "react"
import {element} from "prop-types"

import ApplicationError from "core/component/Error/ApplicationError"

import Context from "./Context"

/**
 * @api private
 */
class ApplicationErrorHandlerProvider extends Component {
  static propTypes = {
    children: element.isRequired
  }

  state = {
    error: null,
    info: null
  }

  catchError = ({error, info} = {}) => {
    this.setState(prev => ({...prev, error, info}))
  }

  componentDidCatch(error, info) {
    this.catchError({error, info})
  }

  render() {
    const {error, info} = this.state

    if (!error) {
      return h(
        Context.Provider, {value: this.catchError},

        this.props.children
      )
    }

    return h(ApplicationError, {error, info})
  }
}

export default ApplicationErrorHandlerProvider
