import loadablePage from "core/hoc/loadable/page"
import viewer from "common/hoc/viewer"

import Model from "./Model"

const LoadablePage = loadablePage({
  loaders: {
    login: () => Model.create({}),

    Component: () => import("./Login")
  }
})

export default LoadablePage |> viewer
