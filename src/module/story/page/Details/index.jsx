import {withRouter as router} from "react-router-dom"

import loadable from "core/hoc/loadable/page"

const Details = loadable({
  page: () => import("./Details"),

  state: () => import("./state")
})

export default Details |> router
