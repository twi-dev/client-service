import {h} from "preact"

import Link from "react-router-dom/Link"

import LogoIcon from "common/svg/layout/logo.svg"

import {container} from "./logo.sss"

const Logo = () => (
  <Link to="/" class={container}>
    <LogoIcon />
  </Link>
)

export default Logo
