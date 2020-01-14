import {oneOfType, shape, string, bool, node, object} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"
import {createElement as h, Suspense} from "react"

import partial from "lodash/partial"

import createLoadable from "lib/hoc/loadable"
import Loader from "lib/component/Loader/PageLoader"

import DefaultLayout from "layout/DefaultLayout"

const suspense = partial(h, Suspense, {
  fallback: h(Loader)
})

/**
 * Extends Route component of react-router-dom with layouts support
 */
function Route(props) {
  const {page, serial, ...routeProps} = props
  let {component: Component, layout: Layout, prepare} = page

  Component = Component |> createLoadable({
    name: "Route",
    loaders: prepare,
    id: `Route::(${routeProps.path})`
  })

  return suspense(
    h(BaseRoute, {
      ...routeProps,

      render: renderProps => do {
        if (Layout === false) {
          h(Component, renderProps)
        } else if (Layout) {
          suspense(h(Layout, null, h(Component, renderProps)))
        } else {
          suspense(h(DefaultLayout, null, h(Component, renderProps)))
        }
      }
    })
  )
}

Route.displayName = "ApplicationRoute"

Route.propTypes = {
  page: shape({
    layout: oneOfType([node, bool]),
    component: oneOfType([node, object]).isRequired,
    state: shape({})
  }).isRequired,
  path: string,
  exact: bool
}

Route.defaultProps = {
  path: null,
  exact: true
}

export default Route
