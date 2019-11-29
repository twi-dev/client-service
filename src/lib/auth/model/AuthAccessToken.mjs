import {types} from "mobx-state-tree"

import toDate from "date-fns/toDate"

import AuthTokenMinimal from "./AuthTokenMinimal"

const schema = {
  expires: types.Date
}

const before = ({expires, ...snapshot} = {}) => ({
  ...snapshot, expires: expires ? toDate(expires) : expires
})

const AuthAccessToken = AuthTokenMinimal
  .named("AuthAccessToken")
  .props(schema)
  .preProcessSnapshot(before)

export default AuthAccessToken
