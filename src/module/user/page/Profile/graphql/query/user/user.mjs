import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import userQuery from "./user.gql"

async function getUser(login) {
  const options = {
    query: userQuery,
    variables: {
      login
    }
  }

  return await query(options) |> getData("user")
}

export default getUser
