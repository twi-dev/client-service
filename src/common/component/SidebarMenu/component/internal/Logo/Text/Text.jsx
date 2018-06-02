import {h} from "preact"
import {observer, inject} from "mobx-preact"
import {shape} from "prop-types"

import cn from "classnames"

import {app} from "config"

import {container, open} from "./text.sss"

const Text = ({menu}) => (
  <div class={cn(container, {[open]: menu.isOpen})}>
    {app.name}
  </div>
)

Text.displayName = "LogoText"

Text.propTypes = {
  menu: shape({}).isRequired
}

export default Text |> observer |> inject("menu")
