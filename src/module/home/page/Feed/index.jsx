import loadablePage from "core/hoc/loadable/page"
import viewer from "common/hoc/viewer"

const LoadablePage = loadablePage({
  loaders: {
    Component: () => import("./Feed")
  }
})

export default LoadablePage |> viewer
