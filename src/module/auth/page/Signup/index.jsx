import loadablePage from "core/hoc/loadable/page"
import session from "core/auth/decorator/session"

import Model from "./Model"

const LoadablePage = loadablePage({
  loaders: {
    @session session: () => ({}),

    signup: () => Model.create({}),

    Component: () => import("./Signup")
  }
})

export default LoadablePage
