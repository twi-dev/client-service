import loadablePage from "core/hoc/loadable/page"
import session from "core/auth/decorator/session"

import Model from "./Model"

const LoadablePage = loadablePage({
  loaders: {
    @session session: () => ({}),

    login: () => Model.create({}),

    Component: () => import("./Login")
  }
})

export default LoadablePage
