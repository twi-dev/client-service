import {h} from "preact"
import {shape} from "prop-types"
import {inject, observer} from "mobx-preact"

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
