import loadable from "core/hoc/loadable/page"

const state = () => import("./state")

const page = () => import("./New")

const StoryNew = loadable({state, page})

export default StoryNew
