import {types} from "mobx-state-tree"

import CommonDate from "model/Common/Dates/Date"

const {model, maybeNull} = types

const schema = {
  registeredAt: CommonDate,
  updatedAt: maybeNull(CommonDate),
  lastVisited: maybeNull(CommonDate),
}

const User = model("UserDates", schema)

export default User
