import {types} from "mobx-state-tree"

import CommonDate from "./Date"

const {model, maybe} = types

const schema = {
  createdAt: CommonDate,
  updatedAt: maybe(CommonDate)
}

const CommonDates = model("CommonDates", schema)

export default CommonDates
