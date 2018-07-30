import React from "react"

import enhance from "common/hoc/enhanceTextField"

const TextArea = props => <textarea {...props} />

export default enhance(TextArea)
