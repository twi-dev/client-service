import {types} from "mobx-state-tree"

import map from "core/helper/iterator/objectMap"
import transformDate from "common/model/helper/transformDate"

const {model, maybe} = types

const schema = {
  registeredAt: types.Date,
  lastVisit: maybe(types.Date)
}

const preProcessSnapshot = snapshot => map(snapshot, transformDate)

const User = model("UserDates", schema).preProcessSnapshot(preProcessSnapshot)

export default User
