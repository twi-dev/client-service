import loadablePage from "core/hoc/loadable/page"
import viewer from "common/hoc/viewer"

import Model from "./Model"

const LoadablePage = loadablePage({
  loaders: {
    signup: () => Model.create({}),

    Component: () => import("./Signup")
  }
})

export default LoadablePage |> viewer
