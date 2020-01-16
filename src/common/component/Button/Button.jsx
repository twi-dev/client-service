import {oneOfType, shape, arrayOf, string, node, bool} from "prop-types"
import {createElement} from "react"

import omit from "lodash/omit"

import forwardRef from "lib/hoc/forwardRef"
import Abstract from "lib/component/Abstract"

import {container, wide} from "./button.css"

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
  ...forwardRef.propTypes,

  tag: string,
  type: string,
  wide: bool,
  className: string,
  children: oneOfType([node, arrayOf(node)]).isRequired,
  forwardedRef: shape({})
}

Button.defaultProps = {
  ...forwardRef.defaultProps,

  tag: "button",
  type: "button",
  wide: false,
  className: null,
  forwardedRef: null
}

export default Button |> forwardRef
