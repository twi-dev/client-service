import React from "react"
import cn from "classnames"

import {string, element, oneOfType} from "prop-types"

import Primary from "common/component/Button/Primary"

import {container} from "./button.scss"

const Button = ({children, className, ...props}) => (
  <Primary {...props} className={cn(container, className)}>
    {children}
  </Primary>
)

Button.propTypes = {
  type: string,
  className: string,
  children: oneOfType([string.isRequired, element.isRequired]).isRequired
}

Button.defaultProps = {
  type: "button",
  className: undefined
}

export default Button
