import {createElement} from "react"
import {node} from "prop-types"

import {container} from "./footer.scss"

const Footer = ({children}) => (
  <div className={container}>{children}</div>
)

Footer.propTypes = {
  children: node.isRequired
}

export default Footer
