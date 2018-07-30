import React from "react"

import {inject, observer} from "mobx-react"
import {shape, func, bool} from "prop-types"

import {container} from "./menu-footer.sss"

const Footer = ({menu}) => (
  <button
    className={container}
    disabled={menu.isHidden}
    onClick={menu.isOpen ? menu.close : menu.open}
  >
    {menu.isOpen ? "-" : "+"}
  </button>
)

Footer.propTypes = {
  menu: shape({
    isOpen: bool.isRequired,
    isHidden: bool.isRequired,
    open: func.isRequired,
    close: func.isRequired
  }).isRequired
}

export default Footer |> observer |> inject("menu")
