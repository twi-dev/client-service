import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import saveTokens from "core/auth/helper/saveTokens"
import waterfall from "core/helper/array/runWaterfall"

import {mutate} from "core/transport/graphql"

import refreshMutation from "./refreshAccessToken.gql"

const read = getData("authRefreshAccessToken")

const save = accessToken => saveTokens({accessToken}).then(() => accessToken)

function refreshAccessToken({refreshToken}) {
  const params = {
    mutation: refreshMutation,
    variables: {
      refreshToken
    }
  }

  return waterfall([partial(mutate, params), read, save])
}

export default refreshAccessToken
