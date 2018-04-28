import loadPage from "core/hoc/loadPage"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import Story from "./model/Story"
import getStory from "./graphql/query/getStory"

const LoadablePage = loadPage({
  @session state: async ({match}) => ({
    story: await getStory(match.params.slug) |> Story.create
  }),

  component: async () => await import("./Details") |> resolve |> refresh
})

export default LoadablePage
