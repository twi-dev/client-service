import React from "react"
import cn from "classnames"
import Link from "react-router-dom/Link"

import {observer, inject} from "mobx-react"
import {shape} from "prop-types"

import LogoIcon from "common/svg/layout/logo.svg"

import Text from "./Text"

import {container, open} from "./logo.sss"

const Logo = ({menu}) => (
  <Link to="/" className={cn(container, {[open]: menu.isOpen})}>
    <LogoIcon />
    <Text />
  </Link>
)

Logo.propTypes = {
  menu: shape({}).isRequired
}

export default Logo |> observer |> inject("menu")
