import loadable from "core/hoc/loadable/page"

const Signup = loadable({
  page: () => import("./Signup"),

  state: () => import("./state")
})

export default Signup
