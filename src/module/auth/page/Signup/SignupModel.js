import {types} from "mobx-state-tree"

// import client from "core/transport/graphql"
import updateTextField from "common/model/action/updateTextField"

// import createUser from "./createUser.graphql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  email: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updateEmail: updateTextField(self),
  updatePassword: updateTextField(self)
})

const Signup = model("Signup", schema).actions(actions)

export default Signup
export {schema}
