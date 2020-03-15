import {string, node, shape, arrayOf, oneOfType} from "prop-types"
import {createElement} from "react"

import omit from "lodash/omit"
import cn from "classnames/dedupe"
import isPlainObject from "lodash/isPlainObject"

import forwardRef from "lib/hoc/forwardRef"

const isArray = Array.isArray

const setClassName = value => (
  isPlainObject(value) || isArray(value) ? cn(value) : value
)

const except = ["className", "forwardedRef", "tag"]

const Abstract = ({children, omitProps, ...props}) => (
  createElement(props.tag, {
    ...omit(props, except.concat(omitProps)),

    ref: props.forwardedRef,
    className: setClassName(props.className)
  }, children)
)

Abstract.displayName = "AbstractElement"

Abstract.propTypes = {
  tag: string,
  children: node,
  forwardedRef: shape({}),
  omitProps: arrayOf(string),
  className: oneOfType([
    string, shape({}), arrayOf(oneOfType([string, shape({})]))
  ])
}

Abstract.defaultProps = {
  tag: "div",
  omitProps: [],
  children: undefined,
  className: undefined,
  forwardedRef: undefined
}

export default Abstract |> forwardRef
