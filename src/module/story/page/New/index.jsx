import loadable from "core/hoc/loadable/page"

const StoryNew = loadable({
  page: () => import("./New"),

  state: () => import("./state")
})

export default StoryNew
