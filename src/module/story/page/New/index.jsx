import loadablePage from "core/hoc/loadable/page"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import StoryNew from "./model/StoryNew"

const LoadablePage = loadablePage({
  loaders: {
    @session session: () => ({}),

    story: () => StoryNew.create({}),

    Component: async () => await import("./New") |> resolve |> refresh
  }
})

export default LoadablePage
