import {createElement} from "react"
import {node} from "prop-types"

import Viewer from "common/component/Viewer"
import SidebarMenu from "common/component/SidebarMenu"

import {container, content} from "./layout.css"

function Layout({children}) {
  return (
    <Viewer>
      <div className={container}>
        <SidebarMenu />

        <div className={content}>{children}</div>
      </div>
    </Viewer>
  )
}

Layout.propTypes = {
  children: node.isRequired
}

export default Layout
