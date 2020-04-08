import {types as t} from "mobx-state-tree"

import CommonDate from "./Date"

const CommonDates = t.model("CommonDates", {
  createdAt: CommonDate,
  updatedAt: t.maybeNull(CommonDate)
})

export default CommonDates
