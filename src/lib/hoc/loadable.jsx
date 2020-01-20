import {createElement} from "react"

import isPlainObject from "lodash/isPlainObject"
import partial from "lodash/partial"
import pipe from "lodash/fp/pipe"

import useSuspender from "lib/hook/useSuspender"
import parallel from "lib/helper/object/runParallel"
import waterfall from "lib/helper/array/runWaterfall"
import resolve from "lib/helper/util/requireDefault"
import serial from "lib/helper/object/runSerial"
import map from "lib/helper/iterator/objectMap"

const {of: to} = Array

const defaults = {
  name: undefined,
  serial: false
}

const normalize = result => result ? map(result, resolve) : result

/**
 *  Creates a Loadable component that fulfills given loaders object
 *  and passes their results to given Target
 *
 * @param {object} [options = {}]
 * @param {string} options.id – Suspender's ID (it must be unique at app-wide)
 * @param {string} [options.name = undefined] – name of a Target component
 * @param {{[key: string]: Function}} [loaders = undefined]
 * @param {boolean} [options.serial = false] – if "true", run loaders serially
 *
 * @param {(Target: Function) => Function} Loadable
 */
const createLoadable = (options = {}) => Target => {
  let {id, name, loaders, ...params} = {...defaults, ...options}

  let suspender = null
  if (loaders) {
    if (isPlainObject(loaders)) {
      loaders = pipe([to, partial(params.serial ? serial : parallel, loaders)])
    }

    suspender = partial(waterfall, [loaders, normalize])
  }

  function Loadable(props) {
    const data = useSuspender(id, suspender, [props]) ?? {}

    return createElement(Target, {...props, ...data})
  }

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default createLoadable
