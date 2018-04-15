import {h} from "preact"
import {element, arrayOf} from "prop-types"

import Menu from "./Menu"

import {container, content} from "./layout.sss"

const Layout = ({children, ...props}) => (
  <div class={container}>
    <Menu {...props} />
    <div class={content}>{children}</div>
  </div>
)

Layout.propTypes = {
  children: arrayOf(element.isRequired).isRequired
}

export default Layout
