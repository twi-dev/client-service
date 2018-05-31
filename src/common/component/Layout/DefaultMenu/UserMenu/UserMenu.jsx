import {h} from "preact"

import Menu from "common/component/SidebarMenu"

import Profile from "./Profile"
import StoryNew from "./StoryNew"

const UserMenu = () => (
  <Menu>
    <Profile />
    <StoryNew />
  </Menu>
)

export default UserMenu
