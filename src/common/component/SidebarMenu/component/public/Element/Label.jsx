import {oneOfType, string, number, element, shape} from "prop-types"
import {createElement} from "react"

import forwardRef from "core/hoc/forwardRef"

import Plain from "../../internal/Element/Label"

const Label = ({children, forwardedRef, ...props}) => (
  <Plain {...props} ref={forwardedRef}>{children}</Plain>
)

Label.propTypes = {
  forwardedRef: shape({}),
  children: oneOfType([string, number, element]).isRequired
}

Label.defaultProps = {
  forwardedRef: null
}

export default Label |> forwardRef
