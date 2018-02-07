import {h} from "preact"

import ViewLoader from "./ViewLoader"

const withAsyncRoute = options => props => (
  h(ViewLoader, {
    ...props, ...options
  }, props.children)
)

export default withAsyncRoute
