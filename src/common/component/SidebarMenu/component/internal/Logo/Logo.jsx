import {h} from "preact"
import {observer, inject} from "mobx-preact"
import {shape} from "prop-types"

import Link from "react-router-dom/Link"
import cn from "classnames"

import LogoIcon from "common/svg/layout/logo.svg"

import Text from "./Text"

import {container, open} from "./logo.sss"

const Logo = ({menu}) => (
  <Link to="/" class={cn(container, {[open]: menu.isOpen})}>
    <LogoIcon />
    <Text />
  </Link>
)

Logo.propTypes = {
  menu: shape({}).isRequired
}

export default Logo |> observer |> inject("menu")
