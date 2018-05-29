import {h} from "preact"

import Menu from "common/component/SidebarMenu"
import Element from "common/component/SidebarMenu/Element"

const UserMenu = () => (
  <Menu>
    <Element href="/">
      User
    </Element>
  </Menu>
)

export default UserMenu
