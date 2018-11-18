import {createElement as h} from "react"
import {oneOfType, shape, func, string, bool} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"

import DefaultLayout from "common/component/Layout"

import load from "./load"

function Route(props) {
  const {page, serial, ...routeProps} = props

  const {component: Component, layout: Layout, state, loading} = page

  const LoadableComponent = load({Component, state, loading, serial})

  return h(BaseRoute, {
    ...routeProps,

    render: targetProps => do {
      if (Layout === false) {
        h(LoadableComponent, targetProps)
      } else if (!Layout) {
        h(DefaultLayout, null, h(LoadableComponent, targetProps))
      } else {
        h(Layout, null, h(LoadableComponent, targetProps))
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

export default Route
