import {oneOfType, string, number, element, shape} from "prop-types"
import {createElement} from "react"

import forwardRef from "core/hoc/forwardRef"

import Plain from "../../internal/Element/Icon"

const Icon = ({children, forwardedRef, ...props}) => (
  <Plain {...props} ref={forwardedRef}>{children}</Plain>
)

Icon.propTypes = {
  forwardedRef: shape({}),
  children: oneOfType([string, number, element]).isRequired
}

Icon.defaultProps = {
  forwardedRef: null
}

export default Icon |> forwardRef
