import {h} from "preact"

import RouteLoader from "./RouteLoader"

// DEPRECATED
const withAsyncRoute = options => props => (
  h(RouteLoader, {
    ...props, ...options
  }, props.children)
)

export default withAsyncRoute
