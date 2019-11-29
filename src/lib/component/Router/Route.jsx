import {createElement as h} from "react"
import {oneOfType, shape, func, string, bool} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"

import {provider} from "lib/error/context/router"

import DefaultLayout from "common/component/Layout"

function Route(props) {
  const {page, serial, ...routeProps} = props

  const {component: Component, layout: Layout} = page

  return h(BaseRoute, {
    ...routeProps,

    render: targetProps => do {
      if (Layout === false) {
        h(Component, targetProps)
      } else if (!Layout) {
        h(DefaultLayout, null, h(Component, targetProps))
      } else {
        h(Layout, null, h(Component, targetProps))
      }
    }
  })
}

Route.displayName = "ApplicationRoute"

Route.propTypes = {
  page: shape({
    layout: oneOfType([func, bool]),
    component: func.isRequired,
    state: shape({})
  }).isRequired,
  path: string,
  exact: bool
}

Route.defaultProps = {
  path: null,
  exact: true
}

export default Route |> provider
