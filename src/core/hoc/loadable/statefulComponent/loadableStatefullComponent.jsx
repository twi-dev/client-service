import {h} from "preact"

import merge from "lodash/merge"

import connect from "core/model/connect"
import loadable from "core/hoc/loadable"
import runSerial from "core/helper/util/objectRunSerial"
import runParallel from "core/helper/util/objectRunParallel"

const defaults = {
  delay: 300,
  serial: {
    state: false,
    component: false
  }
}

function render({Component, ...state}, props) {
  if (state) {
    Component = connect(state)(Component)
  }

  return h(Component, props)
}

async function fulfill(object, serial = false) {
  if (serial) {
    return runSerial(object)
  }

  return runParallel(object)
}

const patchLoaders = ({Component, ...state}, serial) => ctx => fulfill({
  Component: () => Component(ctx),
  state: () => runSerial(state, ctx)
}, serial)

const loadableStatefulComponent = (params = {}) => {
  const {serial, ...options} = merge({}, defaults, params, {render})

  if (serial.state === true) {
    options.loaders = patchLoaders(options.loaders, serial.component)
  }

  return loadable(options)
}

export default loadableStatefulComponent
