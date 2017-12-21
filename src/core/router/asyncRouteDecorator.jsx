import {createElement} from "preact"

import AsyncRoute from "./AsyncRoute"

const asyncRouteDecorator = component => props => createElement(AsyncRoute, {
  ...props, component
}, props.children)

export default asyncRouteDecorator
