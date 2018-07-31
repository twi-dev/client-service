import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import authenticateMutation from "./authenticate.gql"

function authenticate(credentials) {
  const params = {
    mutation: authenticateMutation,
    variables: {
      credentials
    }
  }

  return mutate(params).then(getData("authenticate"))
}

export default authenticate
