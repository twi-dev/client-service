import {types as t} from "mobx-state-tree"

import CommonDate from "model/Common/Dates/Date"

const User = t.model("UserDates", {
  registeredAt: CommonDate,
  updatedAt: t.maybeNull(CommonDate),
  lastVisited: t.maybeNull(CommonDate),
})

export default User
