import React, {forwardRef} from "react"

import enhance from "common/hoc/enhanceTextField"

const Input = (props, ref) => <input {...{...props, ref}} />

export default Input |> forwardRef |> enhance
