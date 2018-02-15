import {types, flow} from "mobx-state-tree"

import {mutate} from "core/transport/graphql"

import saveTokens from "core/auth/saveTokens"
import updateTextField from "common/model/action/updateTextField"

import createUser from "./createUser.graphql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  email: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updateEmail: updateTextField(self),
  updatePassword: updateTextField(self),

  signup: flow(function* () {
    const {login, email, password} = self

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

const Signup = model("Signup", schema).actions(actions)

export default Signup
export {schema}
