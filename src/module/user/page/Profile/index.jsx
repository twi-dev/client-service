import loadPage from "core/hoc/loadPage"

import session from "core/auth/decorator/session"
import User from "common/model/store/user/User"

import getUser from "./getUser"

const LoadablePage = loadPage({
  @session state: async ({match}) => ({
    user: await getUser(match.params.login) |> User.create
  }),

  component: () => import("./Profile")
})

export default LoadablePage
