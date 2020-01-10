import {createElement as h, Component} from "react"

import omit from "lodash/omit"
import partial from "lodash/partial"
import isNumber from "lodash/isNumber"
import isFunction from "lodash/isFunction"
import partialRight from "lodash/partialRight"
import isPlainObject from "lodash/isPlainObject"

import runParallel from "lib/helper/object/runParallel"
import waterfall from "lib/helper/array/runWaterfall"
import resolve from "lib/helper/util/requireDefault"
import runSerial from "lib/helper/object/runSerial"
import progress from "lib/hoc/loadable/progress"
import map from "lib/helper/iterator/objectMap"

// const isArray = Array.isArray
const keys = Object.keys

const exclude = ["reporter"]

/**
 * Allow to laod data and React components asynchronously
 *
 * @param {object} params
 *
 * @return {Loadable} – proxy component for loading data and other components
 */
const loadable = (params = {}) => {
  const {name, delay, timeout, serial, loading, loaders, render} = params

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
        "The \"render\" function required when "
          + "\"loaders\" option is object."
      )
    }

    if (!(isFunction(loading) || isPlainObject(loading))) {
      throw new TypeError("Expected \"loading\" parameter.")
    }

    if (delay && !isNumber(delay)) {
      throw new TypeError("Expected \"delay\" option as a number.")
    }

    if (timeout && !isNumber(timeout)) {
      throw new TypeError("Expected \"timeout\" option as a number.")
    }

    if (keys(loaders).length > 1 && !isFunction(render)) {
      throw new TypeError(
        "You must resolve a bunch loaded content manually "
          + "by using a custom renderer. So, \"render\" option required."
      )
    }
  }

  class Loadable extends Component {
    __delayTimer = null

    __timeoutTimer = null

    __mounted = false

    constructor(props) {
      super(props)

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
        this.__timeoutTimer = setTimeout(this.__afterTimeOut, timeout)
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
          .then(resolve).then(this.__onFulfilled, this.__onError)
      }

      const run = partial(
        serial === true ? runSerial : runParallel, loaders, [this.props]
      )

      const normalize = partialRight(map, resolve)

      waterfall([run, normalize, this.__onFulfilled]).catch(this.__onError)
    }

    __afterDelay = () => {
      if (this.__mounted) {
        this.setState(state => ({...state, pastDelay: true}), this.__cleanup)
      }
    }

    __afterTimeOut = () => {
      if (this.__mounted) {
        this.setState(state => ({...state, timedOut: true}), this.__cleanup)
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

    __onError = error => {
      this.setState(prev => ({...prev, error}), this.__cleanup)
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

      const props = omit(this.props, exclude)

      if (!isLoaded || error || pastDelay || timedOut) {
        return h(progress(loading), {error, pastDelay, timedOut, isLoaded})
      }

      if (isFunction(loaded)) {
        return render ? render(loaded, props) : h(loaded, props)
      }

      if (!isPlainObject(loaded)) {
        return render(loaded, props)
      }

      if (keys(loaded).length > 1) {
        return render(loaded, props)
      }

      return render ? render(loaded, props) : h(loaded, props)
    }
  }

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default loadable
