import {createElement as h, Component} from "react"

import isNumber from "lodash/isNumber"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import map from "core/helper/iterator/objectMap"
import resolve from "core/helper/util/requireDefault"
import runSerial from "core/helper/promise/objectRunSerial"
import runParallel from "core/helper/promise/objectRunParallel"

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
        "by using a custom renderer. So, \"render\" option required."
      )
    }
  }

  class Loadable extends Component {
    __delayTimer = null

    __timeoutTimer = null

    __mounted = false

    constructor() {
      super()

      this.state = {
        pastDelay: delay === 0,
        timedOut: false,
        loaded: null,
        isLoaded: false,
        error: null
      }

      // Start loading
      this.__load()
    }

    componentDidMount() {
      if (timeout > 0) {
        this.__timeoutTimer = setTimeout(this.__afterTimeout, timeout)
      }

      if (delay > 0) {
        this.__delayTimer = setTimeout(this.__afterDelay, delay)
      }

      this.__mounted = true
    }

    componentWillUnmount() {
      if (this.__delayTimer) {
        clearTimeout(this.__delayTimer)
      }

      if (this.__timeoutTimer) {
        clearTimeout(this.__timeoutTimer)
      }

      this.__mounted = false
    }

    __load = () => {
      if (isFunction(loaders)) {
        return loaders(this.props)
          .then(resolve).then(this.__onFulfilled, this.__onRejected)
      }

      const run = serial === true ? runSerial : runParallel

      run(loaders, this.props)
        .then(loaded => map(loaded, resolve))
        .then(this.__onFulfilled, this.__onRejected)
    }

    __afterDelay = () => {
      if (this.__mounted) {
        this.setState((pastDelay, ...state) => ({...state, pastDelay: true}))
      }
    }

    __afterTimeout = () => {
      if (this.__mounted) {
        this.setState((timedOut, ...state) => ({...state, timedOut: true}))
      }
    }

    __onFulfilled = loaded => {
      if (this.__mounted) {
        this.setState({loaded, isLoaded: true})
      }
    }

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
