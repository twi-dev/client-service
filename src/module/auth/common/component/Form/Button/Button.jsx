import React from "react"
import cn from "classnames"

import {string, element, oneOfType} from "prop-types"

import {container, primary} from "./button.scss"

const Button = ({children, className, ...props}) => (
  <div className={cn(container, className)}>
    <button {...props} className={primary}>
      {children}
    </button>
  </div>
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
