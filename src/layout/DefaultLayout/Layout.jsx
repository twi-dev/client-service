import {createElement} from "react"
import {node} from "prop-types"

import {container, content} from "./layout.css"

const Layout = ({children}) => (
  <div className={container}>
    <div className={content}>{children}</div>
  </div>
)

Layout.propTypes = {
  children: node.isRequired
}

export default Layout
