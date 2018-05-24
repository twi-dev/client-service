import {h} from "preact"

import TextArea from "react-autosize-textarea"

import enhance from "common/hoc/enhanceTextField"

const TextAreaWithAutoSize = props => <TextArea {...props} />

export default TextAreaWithAutoSize |> enhance
