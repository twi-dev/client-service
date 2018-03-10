import {types} from "mobx-state-tree"

import AuthTokenMinimal from "./AuthTokenMinimal"

const schema = {
  expires: types.Date
}

const preProcessSnapshot = snapshot => {
  if (!snapshot) {
    return snapshot
  }

  const expires = snapshot.expires

  return {
    ...snapshot, expires: expires ? new Date(expires) : expires
  }
}

const AuthAccessToken = AuthTokenMinimal
  .named("AuthAccessToken")
  .props(schema)
  .preProcessSnapshot(preProcessSnapshot)

export default AuthAccessToken
