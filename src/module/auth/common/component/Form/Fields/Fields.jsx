import React from "react"

import {element, arrayOf, oneOfType} from "prop-types"

import {container} from "./fields.scss"

const Fields = ({children}) => <div className={container}>{children}</div>

Fields.propTypes = {
  children: oneOfType([element, arrayOf(element.isRequired)]).isRequired
}

export default Fields
