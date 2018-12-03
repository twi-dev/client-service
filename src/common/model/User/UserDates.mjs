import {types} from "mobx-state-tree"

import map from "core/helper/iterator/objectMap"
import transformDate from "common/model/helper/transformDate"

const {model, maybeNull} = types

const schema = {
  registeredAt: types.Date,
  lastVisit: maybeNull(types.Date)
}

const preProcessSnapshot = snapshot => map(snapshot, transformDate)

const User = model("UserDates", schema).preProcessSnapshot(preProcessSnapshot)

export default User
