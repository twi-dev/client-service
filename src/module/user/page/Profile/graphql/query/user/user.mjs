import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import userQuery from "./user.gql"

function getUser(login) {
  const options = {
    query: userQuery,
    variables: {
      login
    }
  }

  return query(options).then(getData("user"))
}

export default getUser
