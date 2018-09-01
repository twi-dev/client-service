import router from "react-router-dom/withRouter"

import create from "core/model/create"
import loadablePage from "core/hoc/loadable/page"
import User from "common/model/store/user/User"

import getUser from "./graphql/query/user"

const LoadablePage = loadablePage({
  loaders: {
    user: ({match}) => getUser(match.params.login).then(create(User)),

    Component: () => import("./Profile")
  }
})

export default LoadablePage |> router
