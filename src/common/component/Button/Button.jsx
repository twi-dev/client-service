import React, {forwardRef} from "react"
import {oneOfType, arrayOf, string, element} from "prop-types"

import cn from "classnames"

import {container} from "./button.sss"

const Button = ({className, children, ...props}, ref) => (
  <button {...{...props, ref}} className={cn(container, className)}>
    {children}
  </button>
)

Button.propTypes = {
  type: string,
  className: string,
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired
}

Button.defaultProps = {
  type: "button",
  className: null
}

export default Button |> forwardRef
