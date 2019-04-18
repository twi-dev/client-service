import {createElement} from "react"
import {oneOfType, shape, arrayOf, string, node, bool} from "prop-types"

import cn from "classnames"
import omit from "lodash/omit"

import forwardRef from "core/hoc/forwardRef"

import {container, wide} from "./button.scss"

const except = ["wide"]

const Button = ({className, children, forwardedRef, ...props}) => (
  <button
    {...omit(props, except)}

    ref={forwardedRef}
    className={cn(container, className, {[wide]: props.wide})}
  >
    {children}
  </button>
)

Button.propTypes = {
  type: string,
  wide: bool,
  className: string,
  children: oneOfType([node, arrayOf(node)]).isRequired,
  forwardedRef: shape({})
}

Button.defaultProps = {
  type: "button",
  wide: false,
  className: null,
  forwardedRef: null
}

export default Button |> forwardRef
