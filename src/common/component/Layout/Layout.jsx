import {string, element, arrayOf, oneOfType} from "prop-types"
import {createElement} from "react"

import {container, content} from "./layout.css"

const Layout = ({children}) => (
  <div className={container}>
    <div className={content}>{children}</div>
  </div>
)

Layout.propTypes = {
  children: oneOfType([
    string, element, arrayOf(element.isRequired)
  ]).isRequired
}

export default Layout
