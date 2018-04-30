import {mutate} from "core/transport/graphql"

import saveTokens from "../../helper/saveTokens"
import refresh from "./refreshAccessToken.gql"

async function refreshAccessToken(refreshToken) {
  const res = await mutate({
    mutation: refresh,
    variables: {
      refreshToken
    }
  })

  const accessToken = res.data.refreshAccessToken

  await saveTokens({accessToken})

  return accessToken
}

export default refreshAccessToken
