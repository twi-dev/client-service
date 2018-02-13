import {h} from "preact"
import {element, arrayOf, oneOfType} from "prop-types"

import {container} from "./footer.sss"

const Footer = ({children}) => <div class={container}>{children}</div>

Footer.propTypes = {
  children: oneOfType([element, arrayOf(element.isRequired)]).isRequired
}

export default Footer
