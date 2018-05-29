import {h} from "preact"

import Menu from "common/component/SidebarMenu"

import Login from "./Login"
import Signup from "./Signup"

const GuestMenu = () => (
  <Menu>
    <Login />
    <Signup />
  </Menu>
)

export default GuestMenu
