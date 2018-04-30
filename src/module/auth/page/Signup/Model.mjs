import {types, flow} from "mobx-state-tree"

import {mutate} from "core/transport/graphql"

import saveTokens from "core/auth/helper/saveTokens"
import updateTextField from "common/model/action/updateTextField"

import createUser from "./createUser.gql"

const {model, optional, string} = types

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

    const res = yield mutate({
      mutation: createUser,
      variables: {
        user: {
          login,
          email,
          password
        }
      }
    })

    yield saveTokens(res.data.createUser)
  })
})

const views = self => ({
  get isValid() {
    const {username, email, password} = self

    return !!(String(username) && String(email) && String(password))
  }
})

const Signup = model("Signup", schema).actions(actions).views(views)

export default Signup
