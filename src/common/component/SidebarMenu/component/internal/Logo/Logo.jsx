import React from "react"
import Link from "react-router-dom/Link"

import {app} from "config"

import LogoIcon from "common/svg/layout/logo.svg"

import Element from "../Element"
import Icon from "../Element/Icon"
import Label from "../Element/Label"

import {container} from "./logo.scss"

const Logo = () => (
  <Link to="/" className={container}>
    <Element>
      <Icon>
        <LogoIcon />
      </Icon>

      <Label>
        {app.name}
      </Label>
    </Element>
  </Link>
)

export default Logo
