import loadablePage from "core/hoc/loadable/page"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import User from "common/model/store/user/User"

import getUser from "./getUser"

const LoadablePage = loadablePage({
  loaders: {
    @session session: () => ({}),

    user: async ({match}) => await getUser(match.params.login) |> User.create,

    Component: async () => await import("./Profile") |> resolve |> refresh
  }
})

export default LoadablePage
