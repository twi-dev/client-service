import loadable from "core/hoc/loadable/page"

const state = () => import("./state")

const page = () => import("./New")

const StoryNew = loadable({state, page, name: "StoryNew"})

export default StoryNew
