import {createElement} from "react"
import {shape} from "prop-types"

import forwardRef from "lib/hoc/forwardRef"

import enhance from "common/hoc/enhanceTextField"

const TextArea = ({forwardedRef, ...props}) => (
  <textarea {...props} ref={forwardedRef} />
)

TextArea.propTypes = {
  forwardedRef: shape({}).isRequired
}

export default TextArea |> forwardRef |> enhance
