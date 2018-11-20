import loadable from "core/hoc/loadable/page"

const Feed = loadable({
  page: () => import("./Feed")
})

export default Feed
