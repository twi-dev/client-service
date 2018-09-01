import React from "react"
import TextArea from "react-autosize-textarea"

import {shape} from "prop-types"

import forwardRef from "core/hoc/forwardRef"
import enhance from "common/hoc/enhanceTextField"

const TextAreaWithAutoSize = ({forwardedRef, ...props}) => (
  <TextArea {...props} ref={forwardedRef} />
)

TextAreaWithAutoSize.propTypes = {
  forwardedRef: shape({}).isRequired
}

export default TextAreaWithAutoSize |> forwardRef |> enhance
