import {createElement as h} from "react"
import {inject, observer} from "mobx-react"
import {shape} from "prop-types"

import GuestMenu from "./GuestMenu"
import UserMenu from "./UserMenu"

const DefaultMenu = ({session}) => h(session ? UserMenu : GuestMenu)

DefaultMenu.propTypes = {
  session: shape({})
}

DefaultMenu.defaultProps = {
  session: null
}

export default DefaultMenu |> observer |> inject("session")
