import {types} from "mobx-state-tree"

import UserContacts from "./UserContacts"
import UserDates from "./UserDates"

const {model, string} = types

const schema = {
  id: string,
  login: string,
  role: string,
  status: string,
  dates: UserDates,
  contacs: UserContacts
}

const User = model("User", schema)

export {schema}
export default User
