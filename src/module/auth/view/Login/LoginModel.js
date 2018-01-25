import {types} from "mobx-state-tree"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateTextField({target: {name, value}}) {
    if (name in self) {
      self[name] = String(value)
    }
  }
})

const Login = model("Login", schema).actions(actions)

export default Login
export {schema}
