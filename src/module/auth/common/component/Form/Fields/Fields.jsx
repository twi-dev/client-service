import {h} from "preact"
import {element, arrayOf, oneOfType} from "prop-types"

import {container} from "./fields.sss"

const Fields = ({children}) => <div class={container}>{children}</div>

Fields.propTypes = {
  children: oneOfType([element, arrayOf(element.isRequired)]).isRequired
}

export default Fields
