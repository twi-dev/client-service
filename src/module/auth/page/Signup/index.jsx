import loadPage from "core/hoc/loadPage"

import Model from "./Model"

export default loadPage({
  state: () => Promise.resolve({signup: Model.create({})}),
  component: () => import("./Signup")
})
