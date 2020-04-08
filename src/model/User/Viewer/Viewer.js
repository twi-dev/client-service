import {types as t} from "mobx-state-tree"

import Dates from "../UserDates"

const Viewer = t.model("Viewer", {
  id: t.identifierNumber,
  login: t.string,
  email: t.string,
  status: t.string,
  role: t.string,
  dates: Dates
})

export default Viewer
