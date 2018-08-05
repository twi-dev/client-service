import React from "react"
import cn from "classnames"

import {observer, inject} from "mobx-react"
import {shape} from "prop-types"

import {app} from "config"

import {container, open} from "./text.scss"

const Text = ({menu}) => (
  <div className={cn(container, {[open]: menu.isOpen})}>
    {app.name}
  </div>
)

Text.displayName = "LogoText"

Text.propTypes = {
  menu: shape({}).isRequired
}

export default Text |> observer |> inject("menu")
