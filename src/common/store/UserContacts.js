import {types} from "mobx-state-tree"

const {model, maybe, string, array} = types

const schema = {
  vk: maybe(string),
  fb: maybe(string),
  twitter: maybe(string),
  email: maybe(array(string))
}

const User = model("UserContacts", schema)

export {schema}
export default User
