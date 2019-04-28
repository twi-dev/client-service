import {string, node, shape, arrayOf, oneOfType} from "prop-types"
import {createElement} from "react"

import cn from "classnames/dedupe"
import isPlainObject from "lodash/isPlainObject"

import forwardRef from "core/hoc/forwardRef"

const isArray = Array.isArray

const setClassName = value => (
  isPlainObject(value) || isArray(value) ? cn(value) : value
)

const Abstract = ({tag, children, className, forwardedRef, ...props}) => (
  createElement(tag, {
    ...props,

    ref: forwardedRef,
    className: setClassName(className)
  }, children)
)

Abstract.displayName = "AbstractElement"

Abstract.propTypes = {
  tag: string,
  children: node,
  className: oneOfType([
    string, shape({}), arrayOf(oneOfType([string, shape({})]))
  ]),
  forwardedRef: shape({})
}

Abstract.defaultProps = {
  tag: "div",
  children: undefined,
  className: undefined,
  forwardedRef: undefined
}

export default Abstract |> forwardRef
