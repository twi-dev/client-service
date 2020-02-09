import {func, objectOf, oneOfType} from "prop-types"
import {createElement} from "react"

const defaults = {
  name: undefined,
  serial: false
}

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
  const {name, loaderHook: useLoaders} = {...defaults, ...options}

  function Loadable({loaders, ...props}) {
    const data = useLoaders(loaders, props)

    return createElement(Target, {...props, ...data})
  }

  Loadable.propTypes = {
    loaders: oneOfType([func, objectOf(func)]).isRequired
  }

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default createLoadable
