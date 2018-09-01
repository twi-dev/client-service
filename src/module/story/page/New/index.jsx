import loadablePage from "core/hoc/loadable/page"

import StoryNew from "./model/StoryNew"

const LoadablePage = loadablePage({
  loaders: {
    story: () => StoryNew.create({}),

    Component: () => import("./New")
  }
})

export default LoadablePage
