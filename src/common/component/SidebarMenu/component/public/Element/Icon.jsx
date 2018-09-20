import React from "react"

import {oneOfType, string, number, element} from "prop-types"

import forwardRef from "core/hoc/forwardRef"

import Plain from "../../internal/Element/Icon"

const Icon = ({children, forwardedRef, ...props}) => (
  <Plain {...props} ref={forwardedRef}>{children}</Plain>
)

Icon.propTypes = {
  children: oneOfType([string, number, element]).isRequired
}

export default Icon |> forwardRef
