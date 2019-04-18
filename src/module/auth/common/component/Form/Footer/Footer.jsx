import {element, arrayOf, oneOfType} from "prop-types"
import {createElement} from "react"

import {container} from "./footer.scss"

const Footer = ({children}) => <div className={container}>{children}</div>

Footer.propTypes = {
  children: oneOfType([element, arrayOf(element.isRequired)]).isRequired
}

export default Footer
