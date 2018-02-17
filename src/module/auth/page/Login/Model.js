import {types, flow} from "mobx-state-tree"

import {mutate} from "core/transport/graphql"

import saveTokens from "core/auth/saveTokens"
import updateTextField from "common/model/action/updateTextField"

import authenticate from "./authenticate.gql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updatePassword: updateTextField(self),

  authenticate: flow(function* () {
    const {login, password} = self

    const res = yield mutate({
      query: authenticate,
      variables: {
        credentials: {
          login, password
        }
      }
    })

    yield saveTokens(res.data.authenticate)
  })
})

const Login = model("Login", schema).actions(actions)

export default Login
export {schema}
