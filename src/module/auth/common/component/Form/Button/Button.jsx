import {string, node} from "prop-types"
import {createElement} from "react"

import cn from "classnames/dedupe"

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
  children: node.isRequired
}

Button.defaultProps = {
  type: "button",
  className: undefined
}

export default Button
