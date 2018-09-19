import React from "react"
import cn from "classnames"

import {arrayOf, shape, element} from "prop-types"
import {inject, observer} from "mobx-react"

import connect from "core/model/connect"

import Logo from "./component/internal/Logo"
import List from "./component/internal/List"
import Toggler from "./component/internal/Toggler"

import Model from "./model/SidebarMenu"

import {container, content, open} from "./sidebar-menu.scss"

const isArray = Array.isArray

const models = () => ({menu: Model.create({})})

const SidebarMenu = ({menu, children}) => (
  <div className={cn(container, {[open]: menu.isOpen})}>
    <div className={content}>
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

      <Toggler />
    </div>
  </div>
)

SidebarMenu.propTypes = {
  children: arrayOf(element.isRequired),
  menu: shape({}).isRequired
}

SidebarMenu.defaultProps = {
  children: null
}

export default SidebarMenu |> connect(models) |> observer |> inject("viewer")
