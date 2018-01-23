import {createElement} from "preact"

import ViewLoader from "./ViewLoader"

const asyncRouteDecorator = options => props => createElement(ViewLoader, {
  ...props, ...options
}, props.children)

export default asyncRouteDecorator
