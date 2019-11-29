import {observer, inject} from "mobx-react"
import {createElement} from "react"
import {shape} from "prop-types"

import cn from "classnames"

import config from "lib/config"

import {container, open} from "./text.scss"

const {app} = config

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
