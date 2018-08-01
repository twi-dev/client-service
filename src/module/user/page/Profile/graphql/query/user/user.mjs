import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import userQuery from "./user.gql"

function getUser(login) {
  const params = {
    query: userQuery,
    variables: {
      login
    }
  }

  return query(params).then(getData("user"))
}

export default getUser
