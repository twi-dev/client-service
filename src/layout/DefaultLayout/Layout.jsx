import {createElement} from "react"
import {node} from "prop-types"

import SidebarMenu from "component/SidebarMenu"

import {container, content} from "./layout.css"

function Layout({children}) {
  return (
    <div className={container}>
      <SidebarMenu />

      <div className={content}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: node.isRequired
}

export default Layout
