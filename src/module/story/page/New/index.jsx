import loadPage from "core/hoc/loadPage"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import StoryNew from "./model/StoryNew"

const LoadablePage = loadPage({
  @session state: () => ({
    story: StoryNew.create({})
  }),

  component: async () => await import("./New") |> resolve |> refresh
})

export default LoadablePage
