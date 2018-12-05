import {createElement as h, Component} from "react"

import isPlainObject from "lodash/isPlainObject"
import isFunction from "lodash/isFunction"
import isNumber from "lodash/isNumber"

import map from "core/helper/iterator/objectMap"
import runSerial from "core/helper/object/runSerial"
import resolve from "core/helper/util/requireDefault"
import runParallel from "core/helper/object/runParallel"

const keys = Object.keys

/**
 * Allow to laod data and React components asynchronously
 *
 * @param {object} params
 *
 * @return {Loadable} – proxy component for loading data and other components
 */
const loadable = (params = {}) => {
  const {name, delay, timeout, serial, loaders, loading, render} = params

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
    }

    componentDidMount() {
      if (timeout > 0) {
        this.__timeoutTimer = setTimeout(this.__afterTimeout, timeout)
      }

      if (delay > 0) {
        this.__delayTimer = setTimeout(this.__afterDelay, delay)
      }

      this.__mounted = true

      // Start loading
      this.__load()
    }

    componentWillUnmount() {
      this.__cleanup()

      this.__mounted = false
    }

    __load = () => {
      if (isFunction(loaders)) {
        return Promise.resolve(loaders(this.props))
          .then(resolve).then(this.__onFulfilled, this.__onRejected)
      }

      const run = serial === true ? runSerial : runParallel

      run(loaders, [this.props])
        .then(loaded => map(loaded, resolve))
        .then(this.__onFulfilled, this.__onRejected)
    }

    __afterDelay = () => {
      if (this.__mounted) {
        this.setState(state => ({...state, pastDelay: true}))
      }
    }

    __afterTimeout = () => {
      if (this.__mounted) {
        this.setState(state => ({...state, timedOut: true}))
      }
    }

    __onFulfilled = loaded => {
      if (this.__mounted) {
        this.setState(
          state => ({...state, loaded, isLoaded: true}),

          this.__cleanup
        )
      }
    }

    __onRejected = error => {
      this.setState(state => ({...state, error}), this.__cleanup)
    }

    __cleanup = () => {
      if (this.__delayTimer) {
        clearTimeout(this.__delayTimer)
      }

      if (this.__timeoutTimer) {
        clearTimeout(this.__timeoutTimer)
      }
    }

    render() {
      const {pastDelay, timedOut, isLoaded, loaded, error} = this.state

      if (error || !isLoaded) {
        return h(loading, {error, pastDelay, timedOut, isLoaded})
      }

      if (isFunction(loaded)) {
        return render ? render(loaded, this.props) : h(loaded, this.props)
      }

      if (!isPlainObject(loaded)) {
        return render(loaded, this.props)
      }

      if (keys(loaded).length > 1) {
        return render(loaded, this.props)
      }

      return render ? render(loaded, this.props) : h(loaded, this.props)
    }
  }

  if (process.env.NODE_ENV !== "production" && name) {
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default loadable
