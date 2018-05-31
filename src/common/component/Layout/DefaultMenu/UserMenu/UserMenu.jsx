import {h} from "preact"

import Menu from "common/component/SidebarMenu"

import Profile from "./Profile"

const UserMenu = () => (
  <Menu>
    <Profile />
  </Menu>
)

export default UserMenu
