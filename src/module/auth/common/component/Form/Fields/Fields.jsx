import {element, arrayOf, oneOfType} from "prop-types"
import {createElement} from "react"

import {container} from "./fields.scss"

const Fields = ({children}) => <div className={container}>{children}</div>

Fields.propTypes = {
  children: oneOfType([element, arrayOf(element.isRequired)]).isRequired
}

export default Fields
