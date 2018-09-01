import router from "react-router-dom/withRouter"

import loadablePage from "core/hoc/loadable/page"
import create from "core/model/create"

import Story from "./model/Story"
import getStory from "./graphql/query/getStory"

const LoadablePage = loadablePage({
  loaders: {
    story: ({match}) => getStory(match.params.slug).then(create(Story)),

    Component: () => import("./Details")
  }
})

export default LoadablePage |> router
