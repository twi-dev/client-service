import {createElement as h} from "react"

import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"
import partial from "lodash/partial"

import connect from "core/model/connect"
import loadable from "core/hoc/loadable"
import merge from "core/helper/util/objectFlatMerge"
import runSerial from "core/helper/object/runSerial"
import runParallel from "core/helper/object/runParallel"
import waterfall from "core/helper/array/runWaterfall"
import resolve from "core/helper/util/requireDefault"
import map from "core/helper/iterator/objectMap"

const defaults = {
  delay: 300,
  serial: {
    state: false,
    component: false
  }
}

function render({Component, ...state}, props) {
  if (!isEmpty(state)) {
    Component = connect(state)(Component)
  }

  return h(Component, props)
}

/**
 * Patch loaders and return a function that enhances loading process
 *
 * @param {Function} component
 * @param {Function | {[key: string]: Function}} [loaders = undefined]
 *
 * @return {(props: {[key: string]: any}) => Promise<{[key: string]: any}>}
 */
const patchLoaders = (component, loaders, serial) => props => {
  const params = {Component: () => component(props)}

  if (loaders) {
    // Patch "state" loader
    params.state = do {
      if (isFunction(loaders)) {
        // Load state from loader function
        partial(loaders, props)
      } else if (serial.state) {
        // ...or load then serial
        partial(runSerial, [loaders, props])
      } else {
        // ...or parallel
        partial(runParallel, [loaders, props])
      }
    }
  }

  const run = serial.component ? runSerial : runParallel

  const normalize = loaded => map(loaded, resolve)

  const fulfill = ({state, ...rest}) => ({...rest, ...state})

  // Run loaders
  return waterfall([partial(run, params), normalize, fulfill])
}

const loadableStatefulComponent = params => {
  const {serial, component, name, ...options} = merge(
    {}, defaults, params, {render}
  )

  options.loaders = patchLoaders(component, options.loaders, serial)

  const Loadable = loadable(options)

  Loadable.displayName = "LoadableStatefulComponent"

  if (process.env.NODE_ENV !== "production" && name) {
    Loadable.displayName += `(${name})`
  }

  return Loadable
}

export default loadableStatefulComponent
