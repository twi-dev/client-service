import {types, flow} from "mobx-state-tree"

import getTime from "date-fns/getTime"

import refresh from "lib/auth/graphql/mutation/refreshAccessToken"

import AuthAccessToken from "./AuthAccessToken"
import AuthrefreshToken from "./AuthRefreshToken"

const {model, maybeNull} = types

const schema = {
  accessToken: maybeNull(AuthAccessToken),
  refreshToken: AuthrefreshToken
}

const actions = self => ({
  refreshAccessToken: flow(function* () {
    const accessToken = yield refresh({
      refreshToken: self.refreshToken.payload
    })

    self.accessToken = AuthAccessToken.create(accessToken)
  })
})

const views = self => ({
  get isAccessExpired() {
    const token = self.accessToken

    if (!token) {
      return true
    }

    const now = Date.now()
    const expires = getTime(token.expires)

    return now >= expires
  }
})

const AuthTokens = model("AuthTokens", schema)
  .actions(actions)
  .views(views)

export default AuthTokens
