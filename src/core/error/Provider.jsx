import React, {createElement as h, Component} from "react"
import {element} from "prop-types"

import isFunction from "lodash/isFunction"

import ApplicationError from "core/component/Error/ApplicationError"

import Context from "./Context"

class Provider extends Component {
  static displayName = "ErrorHandlerProvider"

  static propTypes = {
    children: element.isRequired
  }

  state = {
    error: null,
    info: null,
    matcher: null
  }

  setMatcher = matcher => {
    this.setState(prev => ({...prev, matcher}))
  }

  emitError = () => {}

  componentDidCatch(error, info) {
    this.setState(prev => ({...prev, error, info}))
  }

  render() {
    const {error, info, matcher} = this.state

    if (!error) {
      const {setMatcher, emitError} = this

      return (
        <Context.Provider value={{error: {setMatcher, emitError}}}>
          {this.props.children}
        </Context.Provider>
      )
    }

    if (isFunction(matcher)) {
      return matcher(error, info) ?? h(ApplicationError, {error, info})
    }

    return h(ApplicationError, {error, info})
  }
}

export default Provider
