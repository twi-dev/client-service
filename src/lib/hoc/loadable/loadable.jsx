import {createElement as h, Component} from "react"
import {shape, func} from "prop-types"

import omit from "lodash/omit"
import partial from "lodash/partial"
import isNumber from "lodash/isNumber"
import isFunction from "lodash/isFunction"
import partialRight from "lodash/partialRight"
import isPlainObject from "lodash/isPlainObject"

import TimeoutError from "lib/component/Error/TimeoutError"
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
  const {name, delay, timeout, serial, loaders, render} = params
  let {loading} = params

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
        "You must resolve a bunch loaded content manually " +
        "by using a custom renderer. So, \"render\" option required."
      )
    }
  }

  if (isFunction(loading)) {
    loading = {
      onLoading: loading,
      onError: undefined,

      // TODO: Move to a different file
      onTimeOut: error => h(TimeoutError, {error})
    }
  }

  loading.onLoading = progress(loading.onLoading)

  class Loadable extends Component {
    __delayTimer = null

    __timeoutTimer = null

    __mounted = false

    static propTypes = {
      reporter: shape({set: func.isRequired, catch: func.isRequired})
    }

    static defaultProps = {
      reporter: null
    }

    constructor(props) {
      super(props)

      this.state = {
        pastDelay: delay === 0,
        timedOut: false,
        loaded: null,
        isLoaded: false,
        error: null
      }

      if (props.reporter) {
        if (isFunction(loading.onTimeOut)) {
          props.reporter.set(loading.onTimeOut)
        }

        if (isFunction(loading.onError)) {
          props.reporter.set(loading.onError)
        }
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
        this.setState(state => ({...state, pastDelay: true}))
      }
    }

    __afterTimeOut = () => {
      if (this.__mounted) {
        this.setState(state => ({...state, timedOut: true}))
      }
    }

    __onFulfilled = loaded => {
      if (this.__mounted) {
        this.__cleanup()

        this.setState(state => ({...state, loaded, isLoaded: true}))
      }
    }

    __onError = error => {
      this.setState(prev => ({...prev, error}), this.__cleanup())
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
      const {pastDelay, timedOut, isLoaded, loaded} = this.state

      const props = omit(this.props, exclude)

      if (!isLoaded || pastDelay || timedOut) {
        return h(loading.onLoading, {pastDelay, timedOut})
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
