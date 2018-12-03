import {types, flow} from "mobx-state-tree"

import saveTokens from "core/auth/helper/saveTokens"
import updateTextField from "core/helper/model/updateTextField"

import createUser from "./graphql/mutation/createUser"

const {model, optional, string} = types

const LOGIN_PATTERN = /[a-z0-9-_.]+/i

const schema = {
  username: optional(string, ""),
  email: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateTextField: updateTextField(self),

  createUser: flow(function* () {
    const {email, password} = self

    const login = self.username

    const tokens = yield createUser({login, email, password})

    yield saveTokens(tokens)
  })
})

const views = self => ({
  get isValidLogin() {
    return LOGIN_PATTERN.test(self.username)
  },

  get isValid() {
    const {username, email, password} = self

    return !!(String(username) && String(email) && String(password))
  }
})

const Signup = model("Signup", schema).actions(actions).views(views)

export default Signup
