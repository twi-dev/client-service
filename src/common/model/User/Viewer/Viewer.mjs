import {types as t} from "mobx-state-tree"

import Dates from "../UserDates"

const schema = {
  id: t.identifierNumber,
  login: t.string,
  email: t.string,
  status: t.string,
  role: t.string,
  dates: Dates
}

const Viewer = t.model("Viewer", schema)

export default Viewer
