import {types, flow} from "mobx-state-tree"

import saveTokens from "core/auth/helper/saveTokens"
import updateTextField from "common/model/action/updateTextField"

import authenticate from "./graphql/mutation/authenticate"

const {model, optional, string} = types

const schema = {
  username: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateTextField: updateTextField(self),

  authenticate: flow(function* () {
    const login = self.username
    const password = self.password

    const tokens = yield authenticate({login, password})

    yield saveTokens(tokens)
  })
})

const views = self => ({
  get isValid() {
    const {username, password} = self

    return !!(String(username) && String(password))
  }
})

const Login = model("Login", schema).actions(actions).views(views)

export default Login
