import loadable from "core/hoc/loadable/page"

const page = () => import("./Feed")

const Feed = loadable({page})

export default Feed
