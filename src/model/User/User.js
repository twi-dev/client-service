import {types as t} from "mobx-state-tree"

import UserContacts from "./UserContacts"
import UserDates from "./UserDates"

const schema = {
  id: t.identifier,
  login: t.string,
  role: t.string,
  status: t.string,
  dates: UserDates,
  contacts: t.optional(UserContacts, {})
}

const User = t.model("User", schema)

export default User
