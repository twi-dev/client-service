import loadablePage from "core/hoc/loadable/page"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import Story from "./model/Story"
import getStory from "./graphql/query/getStory"

const LoadablePage = loadablePage({
  loaders: {
    @session session: async () => ({}),

    story: async ({match}) => await getStory(match.params.slug) |> Story.create,

    Component: async () => await import("./Details") |> resolve |> refresh
  }
})

export default LoadablePage
