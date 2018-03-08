import {types} from "mobx-state-tree"

import AuthTokenMinimal from "./AuthTokenMinimal"

const schema = {
  expires: types.Date
}

const AuthAccessToken = AuthTokenMinimal
  .named("AuthAccessToken")
  .props(schema)

export default AuthAccessToken
