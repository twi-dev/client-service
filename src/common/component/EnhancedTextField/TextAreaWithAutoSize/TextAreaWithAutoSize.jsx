import {createElement} from "react"
import {shape} from "prop-types"

import TextArea from "react-autosize-textarea"

import forwardRef from "lib/hoc/forwardRef"

import enhance from "common/hoc/enhanceTextField"

const TextAreaWithAutoSize = ({forwardedRef, ...props}) => (
  <TextArea {...props} ref={forwardedRef} />
)

TextAreaWithAutoSize.propTypes = {
  forwardedRef: shape({})
}

TextAreaWithAutoSize.defaultProps = {
  forwardedRef: null
}

export default TextAreaWithAutoSize |> forwardRef |> enhance
