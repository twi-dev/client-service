import {types as t} from "mobx-state-tree"

const schema = {
  vk: t.maybeNull(t.string),
  fb: t.maybeNull(t.string),
  twitter: t.maybeNull(t.string),
  email: t.maybeNull(t.string),
  telegram: t.maybeNull(t.string)
}

const before = ({...snapshot}) => snapshot

const User = t.model("UserContacts", schema).preProcessSnapshot(before)

export default User
