import {h} from "preact"

import enhance from "common/hoc/enhanceTextField"

const Input = props => <input {...props} />

export default enhance(Input)
