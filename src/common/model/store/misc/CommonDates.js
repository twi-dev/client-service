import {types} from "mobx-state-tree"

import map from "core/helper/iterator/objectMap"
import transformDate from "common/model/helper/transformDate"

const {model, maybe} = types

const schema = {
  createdAt: types.Date,
  updatedAt: maybe(types.Date)
}

const preProcessSnapshot = snapshot => map(snapshot, transformDate)

const CommonDates = model("CommonDates", schema)
  .preProcessSnapshot(preProcessSnapshot)

export default CommonDates
