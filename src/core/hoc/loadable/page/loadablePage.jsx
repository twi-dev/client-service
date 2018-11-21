import partial from "lodash/partialRight"
import isFunction from "lodash/isFunction"

import runParallel from "core/helper/object/runParallel"
import waterfall from "core/helper/array/runWaterfall"
import resolve from "core/helper/util/requireDefault"
import runSerial from "core/helper/object/runSerial"
import loadingProcess from "core/hoc/loadingProcess"
import stateful from "core/hoc/loadable/stateful"
import errorHandler from "core/hoc/errorHandler"
import Loading from "core/component/Loading"

import matchErrors from "./matchErrors"

const createLoadingProcess = ({onLoading, onError} = {}) => loadingProcess({
  onLoading: isFunction(onLoading) ? onLoading : Loading,
  onError: isFunction(onError) ? onError : errorHandler(matchErrors)
})

function loadablePage(params = {}) {
  const {page: component, state, serial, hoc, ...rest} = params

  if (state && !isFunction(state)) {
    throw new TypeError("State should be a function.")
  }

  const loading = createLoadingProcess(params.loading)

  let loaders = null
  if (state) {
    const run = serial && serial.state === true ? runSerial : runParallel

    loaders = props => waterfall([state, resolve]).then(partial(run, props))
  }

  return stateful({...rest, serial, component, loaders, loading})
}

export default loadablePage
