import {withRouter as router} from "react-router-dom"

import loadable from "core/hoc/loadable/page"

const page = () => import("./Profile")

const state = () => import("./state")

const Profile = loadable({state, page, name: "Profile"})

export default Profile |> router
