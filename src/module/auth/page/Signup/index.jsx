import loadPage from "core/hoc/loadPage"
import session from "core/auth/decorator/session"

import Model from "./Model"

const LoadablePage = loadPage({
  @session state: () => Promise.resolve({signup: Model.create({})}),

  component: () => import("./Signup")
})

export default LoadablePage
