import {node, func} from "prop-types"
import {createElement} from "react"

import noop from "lodash/noop"

import forwardRef from "lib/hoc/forwardRef"
import preventDefault from "lib/helper/decorator/preventDefault"

const Form = ({onSubmit, forwardedRef, children, ...props}) => (
  <form {...props} ref={forwardedRef} onSubmit={preventDefault(onSubmit)}>
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

  onSubmit: noop
}

export default Form |> forwardRef
