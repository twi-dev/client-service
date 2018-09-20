import React from "react"

import {oneOfType, string, number, element} from "prop-types"

import forwardRef from "core/hoc/forwardRef"

import Plain from "../../internal/Element/Label"

const Label = ({children, forwardedRef, ...props}) => (
  <Plain {...props} ref={forwardedRef}>{children}</Plain>
)

Label.propTypes = {
  children: oneOfType([string, number, element]).isRequired
}

export default Label |> forwardRef
