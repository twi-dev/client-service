import React from "react"
import {oneOfType, shape, arrayOf, string, element} from "prop-types"

import cn from "classnames"

import forwardRef from "core/hoc/forwardRef"

import {container} from "./button.scss"

const Button = ({className, children, forwardedRef, ...props}) => (
  <button {...props} className={cn(container, className)} ref={forwardedRef}>
    {children}
  </button>
)

Button.propTypes = {
  type: string,
  className: string,
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired,
  forwardedRef: shape({})
}

Button.defaultProps = {
  type: "button",
  className: null,
  forwardedRef: null
}

export default Button |> forwardRef
