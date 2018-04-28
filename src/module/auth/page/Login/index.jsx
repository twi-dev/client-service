import loadPage from "core/hoc/loadPage"
import session from "core/auth/decorator/session"

import Model from "./Model"

const LoadablePage = loadPage({
  @session state: () => Promise.resolve({login: Model.create({})}),

  component: () => import("./Login")
})

export default LoadablePage
