import {types} from "mobx-state-tree"

import map from "core/helper/iterator/objectMap"

import CommonDate from "./Date"

const {model, maybe} = types

const schema = {
  createdAt: CommonDate,
  updatedAt: maybe(CommonDate)
}

const before = snapshot => map(snapshot, raw => ({raw}))

const CommonDates = model("CommonDates", schema).preProcessSnapshot(before)

export default CommonDates
