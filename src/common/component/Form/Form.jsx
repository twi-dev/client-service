import {createElement} from "react"
import {func, shape, element, arrayOf, oneOfType} from "prop-types"

import forwardRef from "core/hoc/forwardRef"
import preventDefault from "core/helper/decorator/preventDefault"

const Form = ({onSubmit, forwardedRef, children, ...props}) => (
  <form {...props} onSubmit={preventDefault(onSubmit, forwardedRef)}>
    {children}
  </form>
)

Form.propTypes = {
  onSubmit: func,
  forwardedRef: shape({}),
  children: oneOfType([element, arrayOf(element)]).isRequired
}

Form.defaultProps = {
  onSubmit: null,
  forwardedRef: null
}

export default Form |> forwardRef
