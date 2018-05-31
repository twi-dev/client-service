import {h} from "preact"
import {inject, observer} from "mobx-preact"
import {shape, string} from "prop-types"

import Element from "common/component/SidebarMenu/Element"

const Profile = ({viewer}) => (
  <Element href={`/@${viewer.login.toLowerCase()}`}>
    User
  </Element>
)

Profile.displayName = "ProfileMenuElement"

Profile.propTypes = {
  viewer: shape({
    login: string.isRequired
  }).isRequired
}

export default Profile |> observer |> inject("viewer")
