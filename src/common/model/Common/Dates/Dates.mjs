import {types} from "mobx-state-tree"

import CommonDate from "./Date"

const {model, maybeNull} = types

const schema = {
  createdAt: CommonDate,
  updatedAt: maybeNull(CommonDate)
}

const CommonDates = model("CommonDates", schema)

export default CommonDates
