import {h} from "preact"
import {inject, observer} from "mobx-preact"
import {shape, func, bool} from "prop-types"

import {container} from "./menu-footer.sss"

const Footer = ({menu}) => (
  <button class={container} onClick={menu.isOpen ? menu.close : menu.open}>
    {menu.isOpen ? "-" : "+"}
  </button>
)

Footer.propTypes = {
  menu: shape({
    isOpen: bool.isRequired,
    open: func.isRequired,
    close: func.isRequired
  }).isRequired
}

export default Footer |> observer |> inject("menu")
