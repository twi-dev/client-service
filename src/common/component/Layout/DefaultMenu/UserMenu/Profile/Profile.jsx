import {createElement} from "react"
import {shape, string} from "prop-types"
import {inject, observer} from "mobx-react"

import {Element, Icon, Label} from "common/component/SidebarMenu/Element"

const Profile = ({viewer}) => (
  <Element href={`/@${viewer.login.toLowerCase()}`}>
    <Icon>Me</Icon>

    <Label>{viewer.login}</Label>
  </Element>
)

Profile.displayName = "ProfileMenuElement"

Profile.propTypes = {
  viewer: shape({
    login: string.isRequired
  }).isRequired
}

export default Profile |> observer |> inject("viewer")
