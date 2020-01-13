import {createElement, lazy, Suspense} from "react"
import {isLazy} from "react-is"

import useSuspender from "lib/hook/useTasksSuspender"
import parallel from "lib/helper/object/runParallel"
import serial from "lib/helper/object/runSerial"

const defaults = {
  name: undefined,
  suspense: false,
  serial: false
}

const createLoadable = (options = {}) => Target => {
  const {name, loaders, suspense, id, ...params} = {...defaults, ...options}

  const fallback = params.loading ?? params.fallback
  const executor = params.serial ? serial : parallel

  if (!isLazy(Target)) {
    Target = lazy(Target)
  }

  function Loadable(props) {
    const data = useSuspender(executor, loaders, id)

    return do {
      if (suspense) {
        createElement(
          Suspense,

          {
            fallback
          },

          createElement(Target, {...props, ...data})
        )
      } else {
        createElement(Target, {...props, ...data})
      }
    }
  }

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default createLoadable
