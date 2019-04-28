import {oneOfType, shape, arrayOf, string, node, bool} from "prop-types"
import {createElement} from "react"

import cn from "classnames"
import omit from "lodash/omit"

import forwardRef from "core/hoc/forwardRef"
import Abstract from "core/component/Abstract"

import {container, wide} from "./button.scss"

const except = ["wide"]

const Button = ({className, children, forwardedRef, ...props}) => (
  <Abstract
    {...omit(props, except.concat(props.tag === "button" ? [] : ["type"]))}

    ref={forwardedRef}
    className={[container, className, {[wide]: props.wide}]}
  >
    {children}
  </Abstract>
)

Button.propTypes = {
  tag: string,
  type: string,
  wide: bool,
  className: string,
  children: oneOfType([node, arrayOf(node)]).isRequired,
  forwardedRef: shape({})
}

Button.defaultProps = {
  tag: "button",
  type: "button",
  wide: false,
  className: null,
  forwardedRef: null
}

export default Button |> forwardRef
