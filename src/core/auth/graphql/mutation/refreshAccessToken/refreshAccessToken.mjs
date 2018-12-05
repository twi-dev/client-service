import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"
import saveTokens from "core/auth/helper/saveTokens"
import waterfall from "core/helper/array/runWaterfall"

import refreshMutation from "./refreshAccessToken.gql"

const saveToken = accessToken => (
  saveTokens({accessToken}).then(() => accessToken)
)

function refreshAccessToken(refreshToken) {
  const params = {
    mutation: refreshMutation,
    variables: {
      refreshToken
    }
  }

  return waterfall([getData("refreshAccessToken"), saveToken], mutate(params))
}

export default refreshAccessToken
