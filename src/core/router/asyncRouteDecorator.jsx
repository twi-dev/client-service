import {createElement} from "preact"

import AsyncRoute from "./AsyncRoute"

const asyncRouteDecorator = options => props => createElement(AsyncRoute, {
  ...props, ...options
}, props.children)

export default asyncRouteDecorator
