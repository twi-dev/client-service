import isFunction from "lodash/isFunction"

// import loadingProcess from "core/hoc/loadingProcess"
import loadable from "core/hoc/loadable/page"
import runSerial from "core/helper/object/runSerial"
import runParallel from "core/helper/object/runParallel"

// TODO: Replace loadable/page HOC with loadable/stateful
function load(params) {
  const {Component: component, state, loading, serial, hoc, ...rest} = params

  let loaders = state
  if (isFunction(loaders)) {
    const run = (serial && serial.state === true) ? runSerial : runParallel

    loaders = props => run(loaders, props)
  }

  const Target = loadable({...rest, serial, component, loaders, loading})

  return Target
}

export default load
