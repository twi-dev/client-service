import {shape, oneOfType, arrayOf, bool, node} from "prop-types"
import {observer, inject} from "mobx-react"
import {createElement} from "react"

import cn from "classnames"

import {container, open} from "./label.scss"

const Label = ({children, menu}) => (
  <div className={cn(container, {[open]: menu.isOpen})}>
    {children}
  </div>
)

Label.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  menu: shape({
    isOpen: bool.isRequired,
    isHidden: bool.isRequired
  }).isRequired
}

Label.displayName = "SidebarMenuPlainElementLabel"

export default Label |> observer |> inject("menu")
