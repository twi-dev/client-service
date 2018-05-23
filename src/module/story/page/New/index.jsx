import loadablePage from "core/hoc/loadable/page"
import viewer from "common/hoc/viewer"

import StoryNew from "./model/StoryNew"

const LoadablePage = loadablePage({
  loaders: {
    story: () => StoryNew.create({}),

    Component: () => import("./New")
  }
})

export default LoadablePage |> viewer
