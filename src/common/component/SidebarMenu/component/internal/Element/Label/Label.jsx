import React from "react"
import cn from "classnames"

import {observer, inject} from "mobx-react"
import {
  shape, oneOfType, arrayOf,
  string, number, element, bool
} from "prop-types"

import {container, open} from "./label.scss"

const Label = ({children, menu}) => (
  <div className={cn(container, {[open]: menu.isOpen})}>
    {children}
  </div>
)

Label.propTypes = {
  children: oneOfType([arrayOf(element), string, number, element]).isRequired,
  menu: shape({
    isOpen: bool.isRequired,
    isHidden: bool.isRequired
  }).isRequired
}

export default Label |> observer |> inject("menu")
