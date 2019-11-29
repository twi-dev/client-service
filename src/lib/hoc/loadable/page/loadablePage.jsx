import partial from "lodash/partialRight"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import runParallel from "lib/helper/object/runParallel"
import waterfall from "lib/helper/array/runWaterfall"
import resolve from "lib/helper/util/requireDefault"
import runSerial from "lib/helper/object/runSerial"
import stateful from "lib/hoc/loadable/stateful"
import Loading from "lib/component/Loading"

import {consumer} from "lib/error/context/router"

import matchErrors from "./matchErrors"

const isArray = Array.isArray

function createLoadingProcess(loading) {
  if (isFunction(loading)) {
    return {
      onLoading: loading,
      onError: matchErrors
    }
  }

  if (isPlainObject(loading)) {
    const {onLoading, onError} = loading

    return {
      onLoading: isFunction(onLoading) ? onLoading : Loading,
      onError: do {
        if (isArray(onError)) {
          [matchErrors].concat(onError)
        } else if (isFunction(onError)) {
          [matchErrors].concat([onError])
        } else {
          [matchErrors]
        }
      }
    }
  }

  return {onLoading: Loading, onError: matchErrors}
}

function loadablePage(params = {}) {
  const {page: component, state, serial, name, ...rest} = params

  if (state && !isFunction(state)) {
    throw new TypeError(
      "You must provide a function that will import a state: " +
      "const state = () => import(\"path/to/state\")"
    )
  }

  const loading = createLoadingProcess(params.loading)

  let loaders = null
  if (state) {
    const run = serial && serial.state === true ? runSerial : runParallel

    loaders = props => waterfall([state, resolve]).then(partial(run, [props]))
  }

  const Stateful = stateful({...rest, serial, component, loaders, loading})

  Stateful.displayName = "LoadablePage"

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Stateful.displayName = `Loadable(${name})`
  }

  return Stateful |> consumer
}

export default loadablePage
