import {types, flow} from "mobx-state-tree"

import saveTokens from "lib/auth/helper/saveTokens"
import waterfall from "lib/helper/array/runWaterfall"
import updateTextField from "lib/helper/model/updateTextField"

import signUp from "common/graphql/mutation/auth/signUp"

const {model, optional, string} = types

const LOGIN_PATTERN = /[a-z0-9-_.]+/i

const schema = {
  username: optional(string, ""),
  email: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateUsername: updateTextField(self, "username"),
  updateEmail: updateTextField(self, "username"),
  updatePassword: updateTextField(self, "username"),

  submit: flow(function* () {
    const user = {
      login: self.username,
      email: self.email,
      password: self.password
    }

    yield waterfall([signUp, saveTokens], {user})
  })
})

const views = self => ({
  get isValidLogin() {
    return LOGIN_PATTERN.test(self.username)
  },

  get isValid() {
    const {username, email, password} = self

    return !!(username && email && password)
  }
})

const Signup = model("Signup", schema).actions(actions).views(views)

export default Signup
