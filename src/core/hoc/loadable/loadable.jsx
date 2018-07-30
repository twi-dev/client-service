import {createElement as h, Component} from "react"

import isNumber from "lodash/isNumber"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import isNaN from "core/helper/util/isNaN"
import map from "core/helper/iterator/objectMap"
import resolve from "core/helper/util/requireDefault"
import runSerial from "core/helper/util/objectRunSerial"
import runParallel from "core/helper/util/objectRunParallel"

const keys = Object.keys

const loadable = (options = {}) => {
  const {delay, timeout, serial, loaders, loading, render} = options

  if (process.env.NODE_ENV !== "production") {
    if (!loaders) {
      throw new Error("Loaders option is required.")
    }

    if (!(isPlainObject(loaders) || isFunction(loaders))) {
      throw new TypeError(
        "Expected \"loaders\" option as an object or function."
      )
    }

    if (isPlainObject(loaders) && !isFunction(render)) {
      throw new Error(
        "The \"render\" function required when " +
        "\"loaders\" option is object."
      )
    }

    if (!isFunction(loading)) {
      throw new TypeError("Expected \"loading\" component.")
    }

    if (delay && !isNumber(delay)) {
      throw new TypeError("Expected \"delay\" option as a number.")
    }

    if (timeout && !isNumber(timeout)) {
      throw new TypeError("Expected \"timeout\" option as a number.")
    }

    if (keys(loaders).length > 1 && !isFunction(render)) {
      throw new TypeError(
        "You must resolve a bunch loaded content manually " +
        "by using a custom renderer. So, \"render\" options required."
      )
    }
  }

  class Loadable extends Component {
    constructor() {
      super()

      this.state = {
        pastDelay: false,
        timedOut: false,
        loaded: null,
        isLoaded: false,
        error: null
      }
    }

    // FIXME: This life cycle method is depreacated,
    //   so I need to move this logic to component's constructor
    componentWillMount() {
      if (delay && (!isNaN(delay) && Number(delay) > 0)) {
        this.__delayTimer = setTimeout(this.__afterDelay, delay)
      } else {
        this.setState({pastDelay: true})
      }

      if (timeout && Number(timeout) > 0) {
        this.__timeoutTimer = setTimeout(this.__afterTimeout, timeout)
      }

      if (isFunction(loaders)) {
        return loaders(this.props)
          .then(resolve).then(this.__onFulfilled, this.__onRejected)
      }

      const resolver = serial === true ? runSerial : runParallel

      resolver(loaders, this.props)
        .then(loaded => map(loaded, resolve))
        .then(this.__onFulfilled, this.__onRejected)
    }

    componentWillUnmount() {
      if (this.__delayTimer) {
        clearTimeout(this.__delayTimer)
      }

      if (this.__timeoutTimer) {
        clearTimeout(this.__timeoutTimer)
      }
    }

    __delayTimer = null

    __timeoutTimer = null

    __afterDelay = () => this.setState({pastDelay: true})

    __afterTimeout = () => this.setState({timedOut: true})

    __onFulfilled = loaded => this.setState({loaded, isLoaded: true})

    __onRejected = error => this.setState({error})

    render() {
      const {pastDelay, timedOut, isLoaded, loaded, error} = this.state

      if (this.state.error || !this.state.isLoaded) {
        return h(loading, {error, pastDelay, timedOut, isLoaded})
      }

      if (isFunction(loaded)) {
        return render ? render(loaded, this.props) : h(loaded, this.props)
      }

      if (keys(loaded).length > 1) {
        return render(loaded, this.props)
      }

      return render(loaded, this.props)
    }
  }

  return Loadable
}

export default loadable
