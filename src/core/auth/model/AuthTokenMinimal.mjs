import {types} from "mobx-state-tree"

const {model, string} = types

const schema = {
  type: string,
  payload: string
}

const AuthTokenMinimal = model("AuthTokenMinimal", schema)

export default AuthTokenMinimal
