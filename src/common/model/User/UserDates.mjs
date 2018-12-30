import {types} from "mobx-state-tree"

import CommonDate from "common/model/Common/Dates/Date"

const {model, maybeNull} = types

const schema = {
  registeredAt: CommonDate,
  lastVisit: maybeNull(CommonDate)
}

const User = model("UserDates", schema)

export default User
