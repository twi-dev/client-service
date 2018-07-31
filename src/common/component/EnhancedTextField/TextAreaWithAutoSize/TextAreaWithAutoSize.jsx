import React, {forwardRef} from "react"

import TextArea from "react-autosize-textarea"

import enhance from "common/hoc/enhanceTextField"

const TextAreaWithAutoSize = (props, ref) => <TextArea {...{...props, ref}} />

export default TextAreaWithAutoSize |> forwardRef |> enhance
