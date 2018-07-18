import {types} from "mobx-state-tree"

import UserContacts from "./UserContacts"
import UserDates from "./UserDates"

const {model, string, identifier, optional} = types

const schema = {
  id: identifier,
  login: string,
  role: string,
  status: string,
  dates: UserDates,
  contacs: optional(UserContacts, {})
}

const User = model("User", schema)

export default User
