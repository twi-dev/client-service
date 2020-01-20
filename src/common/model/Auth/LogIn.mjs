import {types, flow} from "mobx-state-tree"

import saveTokens from "lib/auth/helper/saveTokens"
import waterfall from "lib/helper/array/runWaterfall"
import updateTextField from "lib/helper/model/updateTextField"

import logIn from "common/graphql/mutation/auth/logIn"

const {model, optional, string} = types

const schema = {
  username: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateUsername: updateTextField(self, "username"),
  updatePassword: updateTextField(self, "password"),

  submit: flow(function* () {
    const user = {username: self.username, password: self.password}

    yield waterfall([logIn, saveTokens], {user})
  })
})

const views = self => ({
  get isValid() {
    const {username, password} = self

    return Boolean(username && password)
  }
})

const LogIn = model("LogIn", schema).actions(actions).views(views)

export default LogIn
