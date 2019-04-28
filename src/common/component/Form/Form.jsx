import {node, func} from "prop-types"
import {createElement} from "react"

import forwardRef from "core/hoc/forwardRef"
import preventDefault from "core/helper/decorator/preventDefault"

const Form = ({onSubmit, forwardedRef, children, ...props}) => (
  <form {...props} onSubmit={preventDefault(onSubmit, forwardedRef)}>
    {children}
  </form>
)

Form.propTypes = {
  ...forwardRef.propTypes,

  onSubmit: func,
  children: node.isRequired
}

Form.defaultProps = {
  ...forwardRef.defaultProps,

  onSubmit: null
}

export default Form |> forwardRef
