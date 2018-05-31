import {h} from "preact"
import {arrayOf, element} from "prop-types"
import {inject, observer} from "mobx-preact"

import connect from "core/model/connect"

import Logo from "./component/internal/Logo"
import List from "./component/internal/List"
import Footer from "./component/internal/Footer"

import Model from "./model/SidebarMenu"

import {container} from "./sidebar-menu.sss"

const isArray = Array.isArray

const menu = () => ({menu: Model.create({})})

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

export default SidebarMenu |> connect(menu) |> observer |> inject("viewer")
