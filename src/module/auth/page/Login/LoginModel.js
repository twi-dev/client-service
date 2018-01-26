import {types} from "mobx-state-tree"

import updateTextField from "common/model/action/updateTextField"

// import authenticate from "./authenticate.graphql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updatePassword: updateTextField(self),
  // authenticate() {},
  // execAuth() {},
  // onAuthFailed() {},
  // onAuthGranted() {}
})

const Login = model("Login", schema).actions(actions)

export default Login
export {schema}
