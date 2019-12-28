import {observer, inject} from "mobx-react"
import {shape, func} from "prop-types"
import {createElement} from "react"

import cn from "classnames"

import {container, active} from "./mask.css"

const Mask = ({menu}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    role="button"
    tabIndex={-1}
    onClick={menu.close}
    className={cn(container, {[active]: menu.isOpen})}
  />
)

Mask.displayName = "SidebarMenuMask"

Mask.propTypes = {
  menu: shape({close: func.isRequired}).isRequired
}

export default Mask |> observer |> inject("menu")
