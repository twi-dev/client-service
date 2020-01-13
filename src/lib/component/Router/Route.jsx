import {oneOfType, shape, string, bool, node} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"
import {createElement as h, Suspense} from "react"

import createLoadable from "lib/hoc/loadable"

import DefaultLayout from "layout/DefaultLayout"

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

  return h(
    Suspense,

    {
      fallback: h("div", null, "Loading page...")
    },

    h(BaseRoute, {
      ...routeProps,

      render: renderProps => do {
        if (Layout === false) {
          h(Component, renderProps)
        } else if (Layout) {
          h(Layout, null, h(Component, renderProps))
        } else {
          h(DefaultLayout, null, h(Component, renderProps))
        }
      }
    })
  )
}

Route.displayName = "ApplicationRoute"

Route.propTypes = {
  page: shape({
    layout: oneOfType([node, bool]),
    component: node,
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
