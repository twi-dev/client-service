import {h} from "preact"
import {arrayOf, element} from "prop-types"
import {inject, connect} from "mobx-preact"

import Logo from "./component/internal/Logo"
import List from "./component/internal/List"
import Footer from "./component/internal/Footer"

import {container} from "./sidebar-menu.sss"

const isArray = Array.isArray

const SidebarMenu = ({children}) => (
  <div class={container}>
    <Logo />

    {
      do {
        if (isArray(children)) {
          <List>
            {children}
          </List>
        }
      }
    }

    <Footer />
  </div>
)

SidebarMenu.propTypes = {
  children: arrayOf(element.isRequired)
}

SidebarMenu.defaultProps = {
  children: null
}

export default SidebarMenu |> connect |> inject("viewer")
