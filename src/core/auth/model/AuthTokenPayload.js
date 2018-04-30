import {types, flow} from "mobx-state-tree"

import AuthAccessToken from "./AuthAccessToken"
import AuthrefreshToken from "./AuthRefreshToken"

import refreshAccessToken from "../graphql/mutation/refreshAccessToken"

const {model, maybe} = types

const schema = {
  accessToken: maybe(AuthAccessToken),
  refreshToken: maybe(AuthrefreshToken)
}

const actions = self => ({
  refreshAccessToken: flow(function* () {
    const accessToken = yield refreshAccessToken(self.refreshToken)

    self.accessToken = AuthAccessToken.create(accessToken)
  })
})

const views = self => ({
  get isAccessExpired() {
    const token = self.accessToken

    if (!token) {
      return true
    }

    const now = new Date()
    const expires = new Date(token.expires)

    return now.getTime() >= expires.getTime()
  }
})

const AuthTokenPayload = model("AuthTokenPayload", schema)
  .actions(actions)
  .views(views)

export default AuthTokenPayload
