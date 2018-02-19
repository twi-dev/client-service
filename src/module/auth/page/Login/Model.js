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
  updateTextField: updateTextField(self),

  authenticate: flow(function* () {
    const {login, password} = self

    const res = yield mutate({
      mutation: authenticate,
      variables: {
        credentials: {
          login, password
        }
      }
    })

    yield saveTokens(res.data.authenticate)
  })
})

const views = self => ({
  get isValid() {
    const {login, password} = self

    return !!(String(login) && String(password))
  }
})

const Login = model("Login", schema).actions(actions).views(views)

export default Login
export {schema}
