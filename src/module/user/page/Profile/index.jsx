import loadablePage from "core/hoc/loadable/page"

import viewer from "common/hoc/viewer"
import User from "common/model/store/user/User"

import getUser from "./graphql/query/user"

const LoadablePage = loadablePage({
  loaders: {
    user: async ({match}) => await getUser(match.params.login) |> User.create,

    Component: () => import("./Profile")
  }
})

export default LoadablePage |> viewer
