import loadPage from "core/hoc/loadPage"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import User from "common/model/store/user/User"

import getUser from "./getUser"

const LoadablePage = loadPage({
  @session state: async ({match}) => ({
    user: await getUser(match.params.login) |> User.create
  }),

  component: async () => await import("./Profile") |> resolve |> refresh
})

export default LoadablePage
