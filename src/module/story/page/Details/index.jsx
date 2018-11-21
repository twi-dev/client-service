import {withRouter as router} from "react-router-dom"

import loadable from "core/hoc/loadable/page"

const page = () => import("./Details")

const state = () => import("./state")

const Details = loadable({page, state})

export default Details |> router
