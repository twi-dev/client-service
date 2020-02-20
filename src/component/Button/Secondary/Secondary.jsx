import {shape, string, node} from "prop-types"
import {createElement} from "react"

import cn from "classnames"

import forwardRef from "lib/hoc/forwardRef"

import Plain from "../Button"

import {container} from "./secondary.css"

const Secondary = ({className, children, forwardedRef, ...props}) => (
  <Plain {...props} className={cn(container, className)} ref={forwardedRef}>
    {children}
  </Plain>
)

Secondary.displayName = "SecondaryButton"

Secondary.propTypes = {
  ...forwardRef.propTypes,

  className: string,
  forwardedRef: shape({}),
  children: node.isRequired
}

Secondary.defaultProps = {
  ...forwardRef.defaultProps,

  className: null
}

export default Secondary |> forwardRef
