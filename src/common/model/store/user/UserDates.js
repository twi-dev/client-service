import {types} from "mobx-state-tree"

const {model, maybe} = types

const MobXDate = types.Date

const schema = {
  registeredAt: MobXDate,
  lastVisit: maybe(MobXDate)
}

const User = model("UserDates", schema)

export default User
