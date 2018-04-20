import loadPage from "core/hoc/loadPage"

import Model from "./Model"

export default loadPage({
  state: () => Promise.resolve({login: Model.create({})}),
  component: () => import("./Login")
})
