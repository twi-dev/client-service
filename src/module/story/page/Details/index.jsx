import loadablePage from "core/hoc/loadable/page"

import viewer from "common/hoc/viewer"

import Story from "./model/Story"
import getStory from "./graphql/query/getStory"

const LoadablePage = loadablePage({
  loaders: {
    story: async ({match}) => await getStory(match.params.slug) |> Story.create,

    Component: () => import("./Details")
  }
})

export default LoadablePage |> viewer
