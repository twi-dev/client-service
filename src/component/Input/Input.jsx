import {string, bool} from "prop-types"
import {createElement} from "react"

import omit from "lodash/omit"
import cn from "classnames"

import forwardRef from "lib/hoc/forwardRef"

import {container, invalid} from "./input.css"

const except = ["className", "invalid"]

const Input = ({className, forwardedRef, ...props}) => (
  <input
    {...omit(props, except)}

    ref={forwardedRef}
    className={cn(container, {[invalid]: props.invalid}, className)}
  />
)

Input.propTypes = {
  ...forwardRef.propTypes,

  className: string,
  invalid: bool
}

Input.defaultProps = {
  ...forwardRef.defaultProps,

  className: undefined,
  invalid: false
}

export default Input |> forwardRef
