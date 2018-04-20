import loadPage from "core/hoc/loadPage"

export default loadPage({
  component: () => import("./New")
})
