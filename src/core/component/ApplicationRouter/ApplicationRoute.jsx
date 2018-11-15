import {join} from "path"

import {createElement} from "react"
import {oneOfType, func, string, bool} from "prop-types"
import {Route as BaseRoute} from "react-router-dom"

import DefaultLayout from "common/component/Layout"

function ApplicationRoute(props) {
  const {component: Target, layout: Layout, path, prefix, ...routeProps} = props

  return createElement(BaseRoute, {
    ...routeProps,

    path: prefix ? join("/", prefix, path) : path,

    render: targetProps => do {
      if (Layout === false) {
        createElement(Target, targetProps)
      } else if (!Layout) {
        createElement(DefaultLayout, null, createElement(Target, targetProps))
      } else {
        createElement(Layout, null, createElement(Target, targetProps))
      }
    }
  })
}

ApplicationRoute.propTypes = {
  layout: oneOfType([func, bool]),
  component: func.isRequired,
  prefix: string,
  exact: bool
}

ApplicationRoute.defaultProps = {
  layout: null,
  prefix: null,
  exact: true
}

export default ApplicationRoute
