import React from "react"

import {inject, observer} from "mobx-react"
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
