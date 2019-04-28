import {createElement} from "react"
import {node} from "prop-types"

import {container} from "./fields.scss"

const Fields = ({children}) => (
  <div className={container}>
    {children}
  </div>
)

Fields.propTypes = {
  children: node.isRequired
}

export default Fields
