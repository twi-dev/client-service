import {h, Component} from "preact"

import isNumber from "lodash/isNumber"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"
import deepFromEntries from "object-deep-from-entries"

const entries = Object.entries

const resolve = obj => obj && "__esModule" in obj ? obj.default : obj

const loadedSymbol = Symbol("loadedSymbol")

const loadable = (options = {}) => {
  const {delay, timeout, loaders, loading, render} = options

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
  }

  class Loadable extends Component {
    constructor() {
      super()

      this.state = {
        pastDelay: false,
        timedOut: false,
        loaded: [],
        isLoaded: false,
        error: null
      }
    }

    componentWillMount() {
      if (delay && Number(delay) > 0) {
        this.__delayTimer = setTimeout(this.__afterDelay, delay)
      } else if (isNumber(delay)) {
        this.setState({pastDelay: true})
      }

      if (timeout && Number(timeout) > 0) {
        this.__timeoutTimer = setTimeout(this.__afterTimeout, timeout)
      } else if (isNumber(timeout)) {
        this.setState({timedOut: true})
      }

      const tasks = isFunction(loaders)
        ? [[loadedSymbol, loaders]]
        : entries(loaders)

      this.__runParallel(tasks)
        .then(this.__onFulfilled).catch(this.__onRejected)
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

    __runParallel = tasks => {
      tasks = tasks
        .map(
          ([key, fn]) => Promise.resolve(fn(this.props)).then(res => [key, res])
        )

      return Promise.all(tasks)
    }

    // __runSerial = tasks => {}

    __onFulfilled = loaded => this.setState({loaded, isLoaded: true})

    __onRejected = error => this.setState({error})

    render() {
      const {pastDelay, timedOut, isLoaded, error} = this.state

      if (this.state.error || !this.state.isLoaded) {
        return h(loading, {error, pastDelay, timedOut, isLoaded})
      }

      const total = this.state.loaded.length
      let loaded = this.state.loaded
        .map(([name, mod]) => [name, resolve(mod)]) |> deepFromEntries

      if (total > 1) {
        return render(loaded, this.props)
      }

      if (total === 1 && !(loadedSymbol in loaded)) {
        return render(loaded, this.props)
      }

      loaded = loaded[loadedSymbol]

      if (render) {
        return render(loaded, this.props)
      }

      return h(loaded, this.props)
    }
  }

  return Loadable
}

export default loadable
