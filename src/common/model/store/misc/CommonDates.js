import {types} from "mobx-state-tree"

import map from "core/helper/iterator/objectMap"

const {model, maybe} = types

const schema = {
  createdAt: types.Date,
  updatedAt: maybe(types.Date)
}

const before = snapshot => map(snapshot, raw => ({raw}))

const CommonDates = model("CommonDates", schema)
  .preProcessSnapshot(before)

export default CommonDates
