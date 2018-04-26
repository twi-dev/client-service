import {types, flow} from "mobx-state-tree"

import {mutate} from "core/transport/graphql"

import AuthAccessToken from "./AuthAccessToken"
import AuthrefreshToken from "./AuthRefreshToken"

import refreshAccessToken from "../graphql/mutation/refreshAccessToken.gql"

import saveTokens from "../helper/saveTokens"

const {model, maybe} = types

const schema = {
  accessToken: maybe(AuthAccessToken),
  refreshToken: maybe(AuthrefreshToken)
}

const actions = self => ({
  refreshAccessToken: flow(function* () {
    const res = yield mutate({
      mutation: refreshAccessToken,
      variables: {
        refreshToken: self.refreshToken.payload
      }
    })

    const accessToken = res.data.refreshAccessToken

    yield saveTokens({accessToken})

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
