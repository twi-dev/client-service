import loadablePage from "core/hoc/loadable/page"

import Model from "./Model"

const LoadablePage = loadablePage({
  loaders: {
    signup: () => Model.create({}),

    Component: () => import("./Signup")
  }
})

export default LoadablePage
