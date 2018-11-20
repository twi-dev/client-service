import {withRouter as router} from "react-router-dom"

import loadable from "core/hoc/loadable/page"

const Profile = loadable({
  page: () => import("./Profile"),

  state: () => import("./state")
})

export default Profile |> router
