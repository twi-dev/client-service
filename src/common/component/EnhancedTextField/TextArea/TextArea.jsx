import React, {forwardRef} from "react"

import enhance from "common/hoc/enhanceTextField"

const TextArea = (props, ref) => <textarea {...{...props, ref}} />

export default TextArea |> forwardRef |> enhance
