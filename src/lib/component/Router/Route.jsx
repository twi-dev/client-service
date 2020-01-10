import {oneOfType, shape, func, string, bool} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"
import {createElement as h} from "react"

import DefaultLayout from "common/component/Layout"

/**
 * Extends Route component of react-router-dom with layouts support
 */
function Route(props) {
  const {page, serial, ...routeProps} = props
  const {component: Component, layout: Layout} = page

  return h(BaseRoute, {
    ...routeProps,

    render: renderProps => do {
      if (Layout === false) {
        h(Component, renderProps)
      } else if (!Layout) {
        h(DefaultLayout, null, h(Component, renderProps))
      } else {
        h(Layout, null, h(Component, renderProps))
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
