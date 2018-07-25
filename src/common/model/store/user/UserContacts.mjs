import {types} from "mobx-state-tree"

const {model, maybeNull, string} = types

const schema = {
  vk: maybeNull(string),
  fb: maybeNull(string),
  twitter: maybeNull(string),
  email: maybeNull(string),
  telegram: maybeNull(string)
}

const before = ({...snapshot}) => snapshot

const User = model("UserContacts", schema).preProcessSnapshot(before)

export default User
