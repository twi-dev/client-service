import {createElement, cloneElement} from "react"
import {node, func, oneOfType} from "prop-types"

import isFunction from "lodash/isFunction"

const RenderFrom = ({children, ...props}) => do {
  if (isFunction(children)) {
    createElement(children, props)
  } else {
    cloneElement(children, props)
  }
}

RenderFrom.propTypes = {
  children: oneOfType([node, func]).isRequired
}

export default RenderFrom
