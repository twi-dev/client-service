import {query} from "core/transport/graphql"

import userQuery from "./user.gql"

async function getUser(login) {
  const res = await query({
    query: userQuery,
    variables: {
      login
    }
  })

  return res.data.user
}

export default getUser
