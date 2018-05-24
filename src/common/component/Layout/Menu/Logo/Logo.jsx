import {h} from "preact"

import Link from "react-router-dom/Link"

import LogoIcon from "common/svg/layout/logo.svg"

import {container} from "./logo.sss"

const Logo = () => (
  <div class={container}>
    <Link to="/">
      <LogoIcon />
    </Link>
  </div>
)

export default Logo
