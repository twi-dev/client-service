import {h} from "preact"
import {inject, connect} from "mobx-preact"

import Logo from "./Logo"

import {container} from "./menu.sss"

const Menu = () => (
  <div class={container}>
    <Logo />
  </div>
)

export default Menu |> connect |> inject("viewer")
