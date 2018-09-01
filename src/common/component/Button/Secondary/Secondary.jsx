import React from "react"
import {shape, oneOfType, arrayOf, string, element} from "prop-types"

import cn from "classnames"

import forwardRef from "core/hoc/forwardRef"

import Plain from "../Button"

import {container} from "./secondary.scss"

const Secondary = ({className, children, forwardedRef, ...props}) => (
  <Plain {...props} className={cn(container, className)} ref={forwardedRef}>
    {children}
  </Plain>
)

Secondary.displayName = "SecondaryButton"

Secondary.propTypes = {
  className: string,
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired,
  forwardedRef: shape({}).isRequired
}

Secondary.defaultProps = {
  className: null
}

export default Secondary |> forwardRef
