import {types} from "mobx-state-tree"

import client from "core/transport/graphql"
import updateTextField from "common/model/action/updateTextField"

import authenticate from "./authenticate.graphql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updatePassword: updateTextField(self),
  authenticate(cb) {
    const {login, password} = self

    client.query({query: authenticate, variables: {login, password}})
      .then(cb)
  }
})

const Login = model("Login", schema).actions(actions)

export default Login
export {schema}
